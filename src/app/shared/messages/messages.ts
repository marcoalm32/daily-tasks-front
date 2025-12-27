export const MESSAGES = {
    errors: {
        required_field: 'Campo obrigatório',
        invalid_email: 'Email inválido',
        invalid_password: 'Senha inválida',
        min_length: (min: number) => `O campo deve ter no mínimo ${min} caracteres.`,
        max_length: (max: number) => `O campo deve ter no máximo ${max} caracteres.`,
        password_mismatch: 'As senhas não coincidem.',
        invalid_date: 'Data inválida.',
        invalid_field: 'Campo inválido.',
        password_stronger: 'A senha deve ter pelo menos 8 caracteres e incluir letras maiúsculas, minúsculas, números e símbolos.'
    },
    inputs: {
        email: 'Email',
        password: 'Senha',
        confirm_password: 'Confirmar Senha',
        name: 'Nome',
        date_of_birth: 'Data de Nascimento',
        submit: 'Enviar',
        cancel: 'Cancelar',
        search: 'Pesquisar',
        save: 'Salvar',
        update: 'Atualizar',
        enter: 'Entrar',
        register: 'Registrar',
        placeholder: {
            email: 'Digite seu email',
            password: 'Digite sua senha',
            confirm_password: 'Confirme sua senha',

        }
    }
}