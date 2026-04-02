import { SignInForm } from "@/services/SignInForm";
import { SignUpForm } from "@/services/SignUpForm";
export default function AuthPage() {
    return (
        <div className="flex gap-10">
            <SignInForm email="" password="" />
            <SignUpForm name="" email="" password="" passwordConfirm="" />
        </div>
    )
}