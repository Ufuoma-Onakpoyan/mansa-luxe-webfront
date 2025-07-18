import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  propertyType?: string;
  budget?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();

    // Send email to company
    const emailResponse = await resend.emails.send({
      from: "MansaLuxeRealty <onboarding@resend.dev>",
      to: ["mansaluxerealty@mrdgngroup.com"],
      subject: `New Contact Form Submission: ${formData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #B8860B; border-bottom: 2px solid #B8860B; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Contact Information</h3>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
            <p><strong>Subject:</strong> ${formData.subject}</p>
          </div>

          ${formData.propertyType || formData.budget ? `
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Property Requirements</h3>
            ${formData.propertyType ? `<p><strong>Property Type:</strong> ${formData.propertyType}</p>` : ''}
            ${formData.budget ? `<p><strong>Budget:</strong> ${formData.budget}</p>` : ''}
          </div>
          ` : ''}

          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Message</h3>
            <p style="white-space: pre-wrap;">${formData.message}</p>
          </div>

          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            This email was sent from the MansaLuxeRealty contact form on your website.
          </p>
        </div>
      `,
    });

    // Send confirmation email to customer
    await resend.emails.send({
      from: "MansaLuxeRealty <onboarding@resend.dev>",
      to: [formData.email],
      subject: "Thank you for contacting MansaLuxeRealty",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #B8860B; border-bottom: 2px solid #B8860B; padding-bottom: 10px;">
            Thank You for Your Inquiry
          </h2>
          
          <p>Dear ${formData.name},</p>
          
          <p>Thank you for contacting MansaLuxeRealty. We have received your inquiry and one of our luxury property experts will get back to you within 24 hours.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Your Inquiry Details</h3>
            <p><strong>Subject:</strong> ${formData.subject}</p>
            <p><strong>Message:</strong> ${formData.message}</p>
          </div>

          <p>In the meantime, feel free to:</p>
          <ul>
            <li>Browse our exclusive property portfolio</li>
            <li>Follow us on social media for the latest updates</li>
            <li>Contact us directly for urgent matters: mansaluxerealty@mrdgngroup.com</li>
          </ul>

          <p>Best regards,<br>
          <strong>The MansaLuxeRealty Team</strong><br>
          A Premium MrDGNGroup Experience</p>

          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            For support inquiries, please contact: support.mansaluxerealty@mrdgngroup.com
          </p>
        </div>
      `,
    });

    console.log("Contact form email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
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