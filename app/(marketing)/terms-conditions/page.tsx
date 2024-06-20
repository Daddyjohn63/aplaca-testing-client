import { PageHeroSection } from "@/components/marketing/page-hero-section"

// CHATGPT INSTRUCTIONS TO CREATE TERMS OF SERVICE DOCUMENT — make sure to customize with your specific details 👇

// Steps:
// 1. Go to https://chat.openai.com/
// 2. Enter the following guidance
// 3. Adjust the details to reflect your specific requirements
// 4. Take the generated response from ChatGPT and place it into the <pre> tag shown below

// Scenario: You are an experienced legal professional.

// I require your expertise to draft straightforward Terms of Service for my website. Below is some essential information:
// - Website: https://yourwebsite.com
// - Name: Alpaca Stack
// - Contact Email: support@yourwebsite.com
// - Description: Alpaca Stack is a React/NextJs template designed to get you started blazingly fast, allowing you to zero in on what truly matters: building your product and accelerating your path to profits.
// - Ownership Rights: Customers can download and use the modules for their projects. Reselling the modules is prohibited. Customers may receive a full refund within the first 7 days of purchase.
// - Data Collected: User's name, email, and transaction details
// - Non-identifiable data collection: Usage of cookies
// - Privacy Policy URL: https://alpacastack.com/privacy-policy
// - Applicable Law: United States
// - Terms Update Notification: Users will be informed via email

// Kindly draft a concise Terms of Service for my website and include today's date. Do not add explanations. Answer:

const TermsConditionsPage = () => {
  return (
    <div>
      <PageHeroSection title="Terms & Conditions" />
      <div className="container py-20">
        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }} >
          {`
Paste Terms of service text here 
          `}
        </pre>
      </div>
    </div>
  )
}
export default TermsConditionsPage
