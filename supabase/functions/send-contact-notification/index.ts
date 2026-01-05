import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  whatsapp?: string;
  serviceType: string;
  requestType: string;
  budget?: string;
  timeline?: string;
  preferredContact?: string;
  message: string;
}

interface ValidationError {
  field: string;
  message: string;
}

// Escape HTML to prevent XSS in emails
function escapeHtml(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Server-side validation
function validateContactForm(data: ContactFormData): ValidationError[] {
  const errors: ValidationError[] = [];
  
  // Validate name
  if (!data.name || typeof data.name !== 'string') {
    errors.push({ field: 'name', message: 'الاسم مطلوب' });
  } else if (data.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'الاسم يجب أن يكون أكثر من حرفين' });
  } else if (data.name.length > 100) {
    errors.push({ field: 'name', message: 'الاسم يجب أن يكون أقل من 100 حرف' });
  } else if (data.name.includes('\n') || data.name.includes('\r')) {
    errors.push({ field: 'name', message: 'الاسم يحتوي على أحرف غير صالحة' });
  }
  
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || typeof data.email !== 'string') {
    errors.push({ field: 'email', message: 'البريد الإلكتروني مطلوب' });
  } else if (!emailRegex.test(data.email)) {
    errors.push({ field: 'email', message: 'البريد الإلكتروني غير صحيح' });
  } else if (data.email.length > 255) {
    errors.push({ field: 'email', message: 'البريد الإلكتروني طويل جداً' });
  } else if (data.email.includes('\n') || data.email.includes('\r')) {
    errors.push({ field: 'email', message: 'البريد الإلكتروني يحتوي على أحرف غير صالحة' });
  }
  
  // Validate whatsapp (optional but if provided, must be valid)
  if (data.whatsapp && typeof data.whatsapp === 'string') {
    const whatsappRegex = /^[0-9+\s-]{8,20}$/;
    if (!whatsappRegex.test(data.whatsapp)) {
      errors.push({ field: 'whatsapp', message: 'رقم الواتساب غير صحيح' });
    }
  }
  
  // Validate serviceType
  const validServiceTypes = ['odoo-development', 'web-development', 'odoo-training', 'business-analysis'];
  if (!data.serviceType || !validServiceTypes.includes(data.serviceType)) {
    errors.push({ field: 'serviceType', message: 'نوع الخدمة غير صالح' });
  }
  
  // Validate requestType
  const validRequestTypes = ['inquiry', 'quote', 'consultation', 'modification'];
  if (!data.requestType || !validRequestTypes.includes(data.requestType)) {
    errors.push({ field: 'requestType', message: 'نوع الطلب غير صالح' });
  }
  
  // Validate budget (optional)
  if (data.budget) {
    const validBudgets = ['less-5k', '5k-15k', '15k-30k', '30k-50k', 'more-50k', 'not-sure'];
    if (!validBudgets.includes(data.budget)) {
      errors.push({ field: 'budget', message: 'الميزانية غير صالحة' });
    }
  }
  
  // Validate timeline (optional)
  if (data.timeline) {
    const validTimelines = ['urgent', 'month', 'quarter', 'flexible'];
    if (!validTimelines.includes(data.timeline)) {
      errors.push({ field: 'timeline', message: 'الجدول الزمني غير صالح' });
    }
  }
  
  // Validate preferredContact (optional)
  if (data.preferredContact) {
    const validContacts = ['whatsapp', 'email', 'phone'];
    if (!validContacts.includes(data.preferredContact)) {
      errors.push({ field: 'preferredContact', message: 'طريقة التواصل غير صالحة' });
    }
  }
  
  // Validate message
  if (!data.message || typeof data.message !== 'string') {
    errors.push({ field: 'message', message: 'الرسالة مطلوبة' });
  } else if (data.message.trim().length < 10) {
    errors.push({ field: 'message', message: 'الرسالة يجب أن تكون أكثر من 10 أحرف' });
  } else if (data.message.length > 5000) {
    errors.push({ field: 'message', message: 'الرسالة طويلة جداً (الحد الأقصى 5000 حرف)' });
  }
  
  return errors;
}

const serviceLabels: Record<string, string> = {
  'odoo-development': 'تطوير وتخصيص أودوو',
  'web-development': 'تطوير ويب متكامل',
  'odoo-training': 'تدريب واستشارات أودوو',
  'business-analysis': 'تحليل الأعمال وتنفيذ الأنظمة',
};

const requestLabels: Record<string, string> = {
  'inquiry': 'استفسار عام',
  'quote': 'طلب عرض سعر',
  'consultation': 'حجز استشارة',
  'modification': 'طلب تعديل على مشروع سابق',
};

const budgetLabels: Record<string, string> = {
  'less-5k': 'أقل من 5,000 ج.م',
  '5k-15k': '5,000 - 15,000 ج.م',
  '15k-30k': '15,000 - 30,000 ج.م',
  '30k-50k': '30,000 - 50,000 ج.م',
  'more-50k': 'أكثر من 50,000 ج.م',
  'not-sure': 'غير محدد بعد',
};

const timelineLabels: Record<string, string> = {
  'urgent': 'عاجل (خلال أسبوع)',
  'month': 'خلال شهر',
  'quarter': 'خلال 3 أشهر',
  'flexible': 'مرن / غير محدد',
};

const contactLabels: Record<string, string> = {
  'whatsapp': 'واتساب',
  'email': 'البريد الإلكتروني',
  'phone': 'اتصال هاتفي',
};

// Simple in-memory rate limiting (resets on function cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5; // Max requests per window
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

function isRateLimited(clientIp: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(clientIp);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return true;
  }
  
  record.count++;
  return false;
}

// Check for honeypot field (bots typically fill hidden fields)
function isSpamBot(data: any): boolean {
  // If honeypot field is filled, it's likely a bot
  if (data.website || data.url || data.honeypot) {
    console.log("Spam bot detected via honeypot field");
    return true;
  }
  return false;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request to send-contact-notification");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('x-real-ip') || 
                     'unknown';
    
    // Check rate limit
    if (isRateLimited(clientIp)) {
      console.warn(`Rate limit exceeded for IP: ${clientIp.substring(0, 10)}...`);
      return new Response(
        JSON.stringify({ 
          error: 'تم تجاوز الحد المسموح من الطلبات. يرجى المحاولة لاحقاً.' 
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const formData = await req.json();
    
    // Check for spam bots via honeypot
    if (isSpamBot(formData)) {
      // Return success to fool the bot, but don't process
      return new Response(
        JSON.stringify({ success: true, message: "تم إرسال الرسالة بنجاح" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Form data received:", { 
      name: formData.name?.substring(0, 20), 
      email: formData.email?.substring(0, 20),
      serviceType: formData.serviceType,
      requestType: formData.requestType 
    });

    // Server-side validation
    const validationErrors = validateContactForm(formData);
    if (validationErrors.length > 0) {
      console.error("Validation errors:", validationErrors);
      return new Response(
        JSON.stringify({ 
          error: 'فشل التحقق من البيانات', 
          details: validationErrors 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Sanitize user inputs for HTML emails
    const safeName = escapeHtml(formData.name.trim());
    const safeEmail = escapeHtml(formData.email.trim());
    const safeWhatsapp = formData.whatsapp ? escapeHtml(formData.whatsapp.trim()) : null;
    const safeMessage = escapeHtml(formData.message.trim());

    const serviceName = serviceLabels[formData.serviceType] || escapeHtml(formData.serviceType);
    const requestName = requestLabels[formData.requestType] || escapeHtml(formData.requestType);
    const budgetName = formData.budget ? budgetLabels[formData.budget] || escapeHtml(formData.budget) : 'غير محدد';
    const timelineName = formData.timeline ? timelineLabels[formData.timeline] || escapeHtml(formData.timeline) : 'غير محدد';
    const contactMethod = formData.preferredContact ? contactLabels[formData.preferredContact] || escapeHtml(formData.preferredContact) : 'غير محدد';

    // Save message to database (use original trimmed values)
    console.log("Saving message to database...");
    const { data: savedMessage, error: dbError } = await supabase
      .from('contact_messages')
      .insert({
        name: formData.name.trim().substring(0, 100),
        email: formData.email.trim().substring(0, 255),
        whatsapp: safeWhatsapp?.substring(0, 20) || null,
        service_type: formData.serviceType,
        request_type: formData.requestType,
        budget: formData.budget || null,
        timeline: formData.timeline || null,
        preferred_contact: formData.preferredContact || null,
        message: formData.message.trim().substring(0, 5000),
        status: 'new'
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
    } else {
      console.log("Message saved to database:", savedMessage.id);
    }

    // Email to the owner (notification) - using sanitized values
    const ownerEmailHtml = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; background: #f5f5f5; padding: 20px; direction: rtl; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; }
          .content { padding: 30px; }
          .info-row { display: flex; padding: 12px 0; border-bottom: 1px solid #eee; }
          .label { font-weight: 600; color: #4b5563; width: 140px; }
          .value { color: #1f2937; flex: 1; }
          .message-box { background: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 20px; border-right: 4px solid #6366f1; }
          .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📩 رسالة جديدة من الموقع</h1>
          </div>
          <div class="content">
            <div class="info-row">
              <span class="label">👤 الاسم:</span>
              <span class="value">${safeName}</span>
            </div>
            <div class="info-row">
              <span class="label">📧 البريد:</span>
              <span class="value">${safeEmail}</span>
            </div>
            ${safeWhatsapp ? `
            <div class="info-row">
              <span class="label">📱 واتساب:</span>
              <span class="value">${safeWhatsapp}</span>
            </div>
            ` : ''}
            <div class="info-row">
              <span class="label">🛠️ نوع الخدمة:</span>
              <span class="value">${serviceName}</span>
            </div>
            <div class="info-row">
              <span class="label">📋 نوع الطلب:</span>
              <span class="value">${requestName}</span>
            </div>
            <div class="info-row">
              <span class="label">💰 الميزانية:</span>
              <span class="value">${budgetName}</span>
            </div>
            <div class="info-row">
              <span class="label">⏱️ الجدول الزمني:</span>
              <span class="value">${timelineName}</span>
            </div>
            <div class="info-row">
              <span class="label">📞 طريقة التواصل:</span>
              <span class="value">${contactMethod}</span>
            </div>
            <div class="message-box">
              <strong>💬 الرسالة:</strong>
              <p style="margin-top: 10px; white-space: pre-wrap;">${safeMessage}</p>
            </div>
          </div>
          <div class="footer">
            تم إرسال هذه الرسالة من موقعك الشخصي
          </div>
        </div>
      </body>
      </html>
    `;

    // Send notification email to owner
    console.log("Sending notification email to owner...");
    const ownerEmailResponse = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["dev-mustafa-hussin@hotmail.com"],
      subject: `📩 رسالة جديدة من ${safeName} - ${serviceName}`,
      html: ownerEmailHtml,
    });

    console.log("Owner email sent:", ownerEmailResponse);

    // Auto-reply email to the sender - using sanitized values
    const autoReplyHtml = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; background: #f5f5f5; padding: 20px; direction: rtl; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; }
          .content { padding: 30px; line-height: 1.8; color: #374151; }
          .highlight { background: #ecfdf5; padding: 15px; border-radius: 8px; margin: 20px 0; border-right: 4px solid #10b981; }
          .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; }
          .social-links { margin-top: 15px; }
          .social-links a { color: #6366f1; text-decoration: none; margin: 0 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ تم استلام رسالتك بنجاح</h1>
          </div>
          <div class="content">
            <p>مرحباً ${safeName}،</p>
            <p>شكراً لتواصلك معي! لقد استلمت رسالتك وسأقوم بالرد عليك في أقرب وقت ممكن.</p>
            
            <div class="highlight">
              <strong>📋 ملخص طلبك:</strong>
              <ul style="margin-top: 10px;">
                <li>نوع الخدمة: ${serviceName}</li>
                <li>نوع الطلب: ${requestName}</li>
                ${formData.budget ? `<li>الميزانية: ${budgetName}</li>` : ''}
              </ul>
            </div>
            
            <p>عادةً ما أرد خلال 24-48 ساعة. إذا كان طلبك عاجلاً، يمكنك التواصل معي مباشرة عبر الواتساب.</p>
            
            <p>مع تحياتي،<br><strong>مصطفى حسين أحمد</strong></p>
          </div>
          <div class="footer">
            <div class="social-links">
              <a href="#">GitHub</a> | <a href="#">LinkedIn</a> | <a href="#">Twitter</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    console.log("Sending auto-reply to sender...");
    const senderEmailResponse = await resend.emails.send({
      from: "Mustafa Hussein <onboarding@resend.dev>",
      to: [formData.email.trim()],
      subject: "✅ تم استلام رسالتك - سأتواصل معك قريباً",
      html: autoReplyHtml,
    });

    console.log("Auto-reply sent:", senderEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "تم إرسال الرسالة بنجاح"
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    // Log full error details server-side for debugging
    console.error("Error in send-contact-notification:", {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      type: error.constructor?.name
    });
    
    // Return safe, generic error to client (don't expose internal details)
    return new Response(
      JSON.stringify({ 
        error: 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.',
        support: 'إذا استمرت المشكلة، تواصل معنا مباشرة عبر البريد الإلكتروني'
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
