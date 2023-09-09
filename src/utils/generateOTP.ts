export default function generateOTP(): string {
    // Generate a random 4-digit number
    const min = 1000; // Minimum value (inclusive)
    const max = 9999; // Maximum value (inclusive)
    const otp = Math.floor(Math.random() * (max - min + 1)) + min;

    // Ensure the OTP is exactly 4 digits
    const formattedOTP = otp.toString().padStart(4, '0');

    return formattedOTP;
}