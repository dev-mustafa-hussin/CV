import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request to send-contact-notification");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    console.log("Form data received:", { ...formData, message: formData.message.substring(0, 50) + "..." });

    const serviceName = serviceLabels[formData.serviceType] || formData.serviceType;
    const requestName = requestLabels[formData.requestType] || formData.requestType;
    const budgetName = formData.budget ? budgetLabels[formData.budget] || formData.budget : 'غير محدد';
    const timelineName = formData.timeline ? timelineLabels[formData.timeline] || formData.timeline : 'غير محدد';
    const contactMethod = formData.preferredContact ? contactLabels[formData.preferredContact] || formData.preferredContact : 'غير محدد';

    // Email to the owner (notification)
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
              <span class="value">${formData.name}</span>
            </div>
            <div class="info-row">
              <span class="label">📧 البريد:</span>
              <span class="value">${formData.email}</span>
            </div>
            ${formData.whatsapp ? `
            <div class="info-row">
              <span class="label">📱 واتساب:</span>
              <span class="value">${formData.whatsapp}</span>
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
              <p style="margin-top: 10px; white-space: pre-wrap;">${formData.message}</p>
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
      to: ["mustafa@example.com"], // Change this to your actual email
      subject: `📩 رسالة جديدة من ${formData.name} - ${serviceName}`,
      html: ownerEmailHtml,
    });

    console.log("Owner email sent:", ownerEmailResponse);

    // Auto-reply email to the sender
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
            <p>مرحباً ${formData.name}،</p>
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
      to: [formData.email],
      subject: "✅ تم استلام رسالتك - سأتواصل معك قريباً",
      html: autoReplyHtml,
    });

    console.log("Auto-reply sent:", senderEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "تم إرسال الرسالة بنجاح",
        ownerEmail: ownerEmailResponse,
        senderEmail: senderEmailResponse 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
