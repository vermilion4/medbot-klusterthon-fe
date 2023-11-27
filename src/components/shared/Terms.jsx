import { Modal } from 'antd';

const Terms = ({ isModalOpen, handleCancel }) => {
  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      className={`terms`}>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <div className=''>
            <h2 className='mb-4 font-semibold text-lg w-[80%]'>
              Terms and services
            </h2>
            <hr />
            <p className='text-subdued text-sm mt-3'>
              <span className='text-base-black font-medium'>
                1. Acceptance of Terms
              </span>
              <br />
              By accessing or using the MedBotAI application (&#34;the
              Application&#34;), you agree to comply with and be bound by these
              Terms and Conditions. If you do not agree with any part of these
              terms, you may not access or use the Application.
              <br />
              <br />
              <span className='text-base-black font-medium'>
                2. Use of the Application
              </span>
              <br />
              2.1. The Application is intended for informational purposes only
              and is not a substitute for professional medical advice,
              diagnosis, or treatment. Always seek the advice of your physician
              or other qualified health provider with any questions you may have
              regarding a medical condition.
              <br />
              <br />
              2.2. You understand and agree that the use of the Application does
              not establish a doctor-patient relationship, and no healthcare
              provider-patient relationship is formed.
              <br />
              <br />
              <span className='text-base-black font-medium'>
                3. User Accounts
              </span>
              <br />
              3.1. To access certain features of the Application, you may be
              required to register for an account. You agree to provide
              accurate, current, and complete information during the
              registration process.
              <br />
              <br />
              3.2. You are responsible for maintaining the confidentiality of
              your account and password. You agree to notify us immediately of
              any unauthorized use of your account.
              <br />
              <br />
              <span className='text-base-black font-medium'>
                4. Privacy Policy
              </span>
              <br />
              4.1. Your use of the Application is also governed by our Privacy
              Policy, which can be found at link. By using the Application, you
              consent to the terms of the Privacy Policy.
              <br />
              <br />
              <span className='text-base-black font-medium'>
                5. Intellectual Property
              </span>
              <br />
              5.1. The content, design, graphics, and other materials related to
              the Application are protected by intellectual property laws. You
              may not reproduce, distribute, modify, or create derivative works
              from any content without our prior written consent.
              <br />
              <br />
              <span className='text-base-black font-medium'>
                6. Disclaimer of Warranties
              </span>
              <br />
              6.1. The Application is provided &#34;as is&#34; and &#34;as
              available&#34; without any warranties, express or implied. We do
              not warrant that the Application will be error-free,
              uninterrupted, or free of viruses.
              <br />
              <br />
              <span className='text-base-black font-medium'>
                7. Limitation of Liability
              </span>
              <br />
              7.1. To the extent permitted by law, we shall not be liable for
              any indirect, incidental, special, consequential, or punitive
              damages arising out of or in connection with your use of the
              Application.
              <br />
              <br />
              <span className='text-base-black font-medium'>
                8. Governing Law
              </span>
              <br />
              8.1. These Terms and Conditions are governed by and construed in
              accordance with the laws of the jurisdiction of the courts of
              Nigeria.
              <br />
              <br />
              <span className='text-base-black font-medium'>
                9. Modifications to Terms
              </span>
              <br />
              9.1. We reserve the right to modify or revise these Terms and
              Conditions at any time. Your continued use of the Application
              after any changes shall signify your acceptance of the modified
              terms.
              <br />
              <br />
              <span className='text-base-black font-medium'>
                10. Contact Information
              </span>
              <br />
              10.1. For any questions about these Terms and Conditions, please
              contact us at <b>medbotai@info.com.</b>
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Terms;
