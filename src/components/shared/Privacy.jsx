import { Modal } from 'antd';

const Privacy = ({ isModalOpen, handleCancel }) => {
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
              Privacy Policy
            </h2>
            <hr />
            <p className='text-subdued text-sm mt-3'>
              <span className='text-wrapper'>
                1. Information We Collect
                <br />
              </span>
              <span className='span'>
                1.1. Personal Information: When you use the MedBotAI
                application, we may collect personal information such as your
                name, contact information, and demographic details.
                <br />
                1.2. Health Information: The application may collect information
                about your health, symptoms, and medical history to provide
                personalized health insights.
                <br />
              </span>
              <span className='text-wrapper'>
                <br />
                2. How We Use Your Information
                <br />
              </span>
              <span className='span'>
                2.1. Medical Guidance: We use the collected information to
                provide personalized medical guidance based on the symptoms and
                health information you provide.
                <br />
                2.2. Improving Services: Your information may be used to improve
                our services, enhance user experience, and develop new features.
                <br />
              </span>
              <span className='text-wrapper'>
                <br />
                3. Data Security
                <br />
              </span>
              <span className='span'>
                3.1. We implement robust security measures to protect your
                personal and health information from unauthorized access,
                disclosure, alteration, and destruction.
                <br />
              </span>
              <span className='text-wrapper'>
                <br />
                4. Sharing of Information
                <br />
              </span>
              <span className='span'>
                4.1. We do not sell, trade, or otherwise transfer your personal
                information to outside parties. However, we may share
                information with trusted third parties who assist us in
                operating the application.
                <br />
              </span>
              <span className='text-wrapper'>
                <br />
                5. Your Choices
                <br />
              </span>
              <span className='span'>
                5.1. You have the right to choose whether or not to provide
                certain information. However, not providing certain information
                may limit your ability to use specific features of the
                application.
                <br />
              </span>
              <span className='text-wrapper'>
                <br />
                6. Third-Party Links
                <br />
              </span>
              <span className='span'>
                6.1. The MedBotAI application may contain links to third-party
                websites or services. We are not responsible for the privacy
                practices of these third-party sites.
                <br />
              </span>
              <span className='text-wrapper'>
                <br />
                7. Children&#39;s Privacy
                <br />
              </span>
              <span className='span'>
                7.1. The application is not intended for individuals under the
                age of 13. We do not knowingly collect personal information from
                children under 13.
                <br />
              </span>
              <span className='text-wrapper'>
                <br />
                8. Changes to Privacy Policy
                <br />
              </span>
              <span className='span'>
                8.1. We reserve the right to modify or revise this privacy
                policy at any time. We will notify users of any material
                changes.
                <br />
              </span>
              <span className='text-wrapper'>
                <br />
                9. Contact Information
                <br />
              </span>
              <span className='span'>
                9.1. If you have any questions or concerns about this privacy
                policy, please contact us at{' '}
              </span>
              <span className='text-wrapper-2'>
                <b>medbotai@info.com</b>
                <br />
              </span>
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Privacy;
