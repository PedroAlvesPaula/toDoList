import React, { useState } from 'react'

export const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submit = (e) => {
        e.preventDefault();

        console.log(username, password);

        Meteor.loginWithPassword(username, password);

        console.log("Form", Meteor.user());
    }

  return (
    <div>
        <form onSubmit={(e) => submit(e)} className='login-form'>
            <div>
                <label>
                    <span>Nome:</span>
                    <input 
                        type="text"
                        placeholder="Digite seu nome"
                        required
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </label>
            </div>
            <div>
                <label>
                    <span>Senha:</span>
                    <input 
                        type="password"
                        placeholder="Digite sua senha"
                        required
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </label>
            </div>
            <div>
                <button type='submit'>Login</button>
            </div>
        </form>
    </div>
  )
}
