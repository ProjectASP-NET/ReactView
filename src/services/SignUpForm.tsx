
interface SignUpFormProps {
    name ?: string;
    email : string;
    password : string;
    passwordConfirm : string;
}

export function SignUpForm({ name, email, password, passwordConfirm }: SignUpFormProps) {
    return (
        <form>
            <h1>Регестрация на сайте</h1>
            <input type="text" placeholder="Имя" defaultValue={name} />
            <input type="email" placeholder="Email" defaultValue={email} />
            <input type="password" placeholder="Пароль" defaultValue={password} />
            <input type="password" placeholder="Подтвердите пароль" defaultValue={passwordConfirm} />
            <button type="submit">Зарегестрироваться</button>
        </form>
    )
}
