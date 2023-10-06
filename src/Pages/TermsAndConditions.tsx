import type { FC } from 'react';
import { BsDot } from 'react-icons/bs';
import { Link } from 'react-router-dom';

interface TermsAndConditionsProps { }

const TermsAndConditions: FC<TermsAndConditionsProps> = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
            <div className="max-w-3xl bg-white p-6 rounded shadow-lg">
                <h1 className="text-2xl font-semibold mb-4">Terms and Conditions</h1>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-1">1. Account Registration</h2>
                    <p className="mb-2 flex items-start gap-1"><BsDot className='text-xl' />You must create an account to use the Application.</p>
                    <p className="mb-2 flex items-start gap-1"><BsDot className='text-xl' />You agree to provide accurate and up-to-date information during the registration process.</p>
                    <p className="mb-2 flex items-start gap-1"><BsDot className='text-xl' />You are responsible for maintaining the confidentiality of your account credentials.</p>
                </section>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-1">2. User Conduct</h2>
                    <p className="mb-2 flex items-start gap-1"><BsDot className='text-xl' />You are solely responsible for your actions and content shared through the Application.</p>
                    <p className="mb-2 flex items-start gap-1"><BsDot className='text-xl' />You agree not to use the Application for any unlawful, harmful, or abusive purposes.</p>
                    <p className="mb-2 flex items-start gap-1"><BsDot className='text-xl' />You will not engage in harassment, hate speech, or any behavior that violates the rights of others.</p>
                </section>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-1">3. Privacy</h2>
                    <p className="mb-2 flex items-start gap-1"><BsDot className='text-xl' />Your use of the Application is subject to our Privacy Policy, which governs the collection and use of your personal information.</p>
                    <p className="mb-2 flex items-start gap-1"><BsDot className='text-xl' />We may collect and store your chat messages for operational purposes and as described in our Privacy Policy.</p>
                </section>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-1">4. Intellectual Property</h2>
                    <p className="mb-2 flex items-start gap-1"><BsDot className='text-xl' />The Application and its content are protected by copyright and other intellectual property laws.</p>
                    <p className="mb-2 flex items-start gap-1"><BsDot className='text-xl' />You may not reproduce, modify, distribute, or create derivative works based on the Application without our prior written consent.</p>
                </section>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-1">5. Termination</h2>
                    <p className="mb-2 flex items-start gap-1"><BsDot className='text-xl' />We reserve the right to suspend or terminate your access to the Application for violations of these Terms.</p>
                    <p className="mb-2 flex items-start gap-1"><BsDot className='text-xl' />You may terminate your account at any time by following the provided instructions.</p>
                </section>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-1">6. Disclaimers</h2>
                    <p className="mb-2 flex items-start gap-1"><BsDot className='text-xl' />The Application is provided "as is," and we make no warranties regarding its reliability, availability, or suitability for any purpose.</p>
                    <p className="mb-2 flex items-start gap-1"><BsDot className='text-xl' />We are not responsible for any damages or losses resulting from your use of the Application.</p>
                </section>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-1">7. Governing Law</h2>
                    <p className="mb-2 flex items-start gap-1"><BsDot className='text-xl' />These Terms are governed by and construed in accordance with the laws of INDIAN COURT OF JUSTICE.</p>
                </section>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-1">8. Changes to Terms</h2>
                    <p className="mb-2 flex items-start gap-1"><BsDot className='text-xl' />We may update these Terms from time to time. Any changes will be communicated to you through the Application or other means.</p>
                </section>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-1">9. Contact Information</h2>
                    <p className="mb-2 flex items-start gap-1"><BsDot className='text-xl' />For questions or concerns regarding these Terms, please contact us at <Link to="https://www.suvaidyam.com" target='_blank' rel="noopener noreferrer" className='text-blue-600'>www.suvaidyam.com</Link>.</p>
                </section>

                <span className='flex justify-center'><Link to={'/register'} className='font-bold text-blue-600'>Back To Register Page.</Link></span>
            </div>

            <footer className="text-center mt-3 text-gray-600">
                <p>&copy; {new Date().getFullYear()} Suvaidyam All Rights Reserved.</p>
            </footer>
        </div>
    );
}

export default TermsAndConditions;
