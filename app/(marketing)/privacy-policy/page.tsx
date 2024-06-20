import { PageHeroSection } from "@/components/marketing/page-hero-section"

// CHATGPT INSTRUCTIONS FOR DRAFTING A PRIVACY POLICY — customize with your specific details 👇

// Steps:
// 1. Go to https://chat.openai.com/
// 2. Enter the following guidance
// 3. Adjust the details to reflect your specific requirements
// 4. Take the generated response from ChatGPT and place it into the <pre> tag shown below

// Scenario: You are an experienced legal consultant.

// I need your assistance to create a clear privacy policy for my website. Please include the necessary information:
// - Website URL: https://yourwebsite.com
// - Business Name: Alpaca Stack
// - Description: Alpaca Stack is a React/NextJs template designed to get you started blazingly fast, allowing you to zero in on what truly matters: building your product and accelerating your path to profits.
// - Types of Personal Data Collected: User names, email addresses, and payment details
// - Types of Non-Personal Data Collected: Cookie data and usage statistics
// - Purpose for Data Collection: To facilitate transactions and improve user experience
// - Data Confidentiality: We ensure that personal data is not shared with third parties
// - Policy Regarding Children’s Privacy: We do not knowingly collect data from persons under the age of 13
// - Updates to the Privacy Policy: Changes will be communicated to users via email
// - Contact for Privacy Concerns: privacy@yourwebsite.com

// Please draft a direct privacy policy with the above details, including the current date. Do not provide explanations. Response:

const PrivacyPolicyPage = () => {
  return (
    <div>
      <PageHeroSection title="Privacy Policy" />
      <div className="container py-20">
        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }} >
          {`
Paste Privacy Policy text here 
          `}
        </pre>
      </div>
    </div>
  )
}
export default PrivacyPolicyPage
