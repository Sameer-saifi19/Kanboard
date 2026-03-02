import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";


export const WelcomeEmail = (supportEmail="support@productSaas.com") => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to ProdSaaS — Your account is ready</Preview>

      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto my-10 max-w-md rounded-lg bg-white p-8 shadow-sm">
            
            <Heading className="text-2xl font-bold text-gray-900 mb-4">
              Welcome to ProdSaaS 🚀
            </Heading>

            <Text className="text-sm text-gray-700 mb-4">
              Hi
            </Text>

            <Text className="text-sm text-gray-700 mb-6 leading-6">
              Your account is officially live. You can now start using ProdSaaS
              to streamline your workflow and ship faster.
            </Text>

            <Section className="text-center mb-6">
              <Button
                href={"/auth/sign-in"}
                className="bg-black text-white px-5 py-3 rounded-md text-sm font-medium"
              >
                Go to Dashboard
              </Button>
            </Section>

            <Text className="text-sm font-semibold text-gray-800 mb-2">
              Recommended next steps:
            </Text>

            <Text className="text-sm text-gray-700">• Complete your profile</Text>
            <Text className="text-sm text-gray-700">• Connect integrations</Text>
            <Text className="text-sm text-gray-700 mb-6">
              • Create your first project
            </Text>

            <Text className="text-sm text-gray-700">
              Need help? Contact us at{" "}
              <a
                href={`mailto:${supportEmail}`}
                className="text-blue-600 underline"
              >
                {supportEmail}
              </a>
            </Text>

            <Text className="text-xs text-gray-400 mt-8">
              — The ProdSaaS Team
            </Text>

          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeEmail;