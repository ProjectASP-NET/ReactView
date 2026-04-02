interface SignInFormProps {
    email : string;
    password : string;
}

export function SignInForm({ email, password }: SignInFormProps) {
    return (
        <form>
            <h1>Вход на сайт</h1>
            <input type="email" placeholder="Email" defaultValue={email} />
            <input type="password" placeholder="Пароль" defaultValue={password} />
            <button type="submit">Войти</button>
        </form>
    )
}