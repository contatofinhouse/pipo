import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { motion } from 'motion/react';

interface AuthProps {
  onLogin: (session: any) => void;
}

export function Auth({ onLogin }: AuthProps) {
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Se tiver só números, formatamos como email falso para usar no Auth do Supabase sem precisar pagar Twilio
      const isPhone = /^[0-9\-\+\s\(\)]+$/.test(contact);
      const emailToUse = isPhone ? `${contact.replace(/\D/g, '')}@pipo.app` : contact;

      if (isSignUp) {
        // 1. Cria a conta
        const signUpResult = await supabase.auth.signUp({
          email: emailToUse,
          password: password,
          options: {
            // Tenta pular a confirmação de email
            emailRedirectTo: undefined,
          }
        });

        if (signUpResult.error) {
          throw signUpResult.error;
        }

        // 2. Se já voltou com sessão (email confirm desativado), ótimo!
        if (signUpResult.data.session) {
          onLogin(signUpResult.data.session);
          return;
        }

        // 3. Se NÃO voltou com sessão, tenta fazer login automático
        const loginResult = await supabase.auth.signInWithPassword({
          email: emailToUse,
          password: password,
        });

        if (loginResult.error) {
          // Se falhou o auto-login, provavelmente "Confirm email" está ativado no Supabase
          setError('Conta criada! Mas o Supabase exige confirmação de email. Vá em Authentication > Providers > Email e DESATIVE "Confirm email". Depois tente de novo.');
          setIsSignUp(false);
          return;
        }

        if (loginResult.data.session) {
          onLogin(loginResult.data.session);
        }
      } else {
        // Login normal
        const authResult = await supabase.auth.signInWithPassword({
          email: emailToUse,
          password: password,
        });

        if (authResult.error) {
          throw authResult.error;
        }

        if (authResult.data.session) {
          onLogin(authResult.data.session);
        }
      }
    } catch (err: any) {
      if (err.message?.includes('Invalid login credentials')) {
         setError('Email/Telefone ou senha inválidos.');
      } else if (err.message?.includes('User already registered')) {
         setError('Este usuário já existe! Tente fazer login.');
         setIsSignUp(false);
      } else if (err.message?.includes('Email not confirmed')) {
         setError('Desative "Confirm email" no Supabase: Authentication > Providers > Email.');
      } else {
         setError(err.message || 'Ocorreu um erro.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    
    // Se o usuário estiver digitando apenas números, aplica a máscara (11) 99999-9999
    if (/^[\d\(\)\-\s]+$/.test(val) || val === '') {
      const raw = val.replace(/\D/g, '');
      if (raw.length <= 11) {
         let formatted = raw;
         if (raw.length > 2) formatted = `(${raw.substring(0, 2)}) ${raw.substring(2)}`;
         if (raw.length > 6) formatted = `(${raw.substring(0, 2)}) ${raw.substring(2, 7)}-${raw.substring(7)}`;
         setContact(formatted);
         return;
      }
    }
    
    // Senão, é um email, deixa livre
    setContact(val);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen bg-[#f5f5f0] flex flex-col items-center justify-center p-6 font-pixel text-gray-900"
    >
      <div className="w-full max-w-sm bg-white p-8 border-8 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-xl font-bold uppercase text-center mb-2">Pipo World</h1>
        <p className="text-center text-[10px] text-gray-500 mb-8 uppercase">Acessar Conta</p>

        {error && (
          <div className="mb-4 bg-red-100 border-2 border-red-500 p-2 text-[10px] text-red-600 font-bold uppercase text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase">Email ou Celular</label>
            <input
              type="text"
              placeholder="(11) 99999-9999 ou seu@email.com"
              value={contact}
              onChange={handleContactChange}
              required
              className="p-3 bg-gray-50 border-4 border-black focus:outline-none focus:bg-white text-xs"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase">Senha</label>
            <input
              type="password"
              placeholder="Sua senha secreta"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="p-3 bg-gray-50 border-4 border-black focus:outline-none focus:bg-white text-xs"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 mt-4 bg-blue-400 border-4 border-black font-bold uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 disabled:opacity-50"
          >
            {loading ? 'Carregando...' : isSignUp ? 'Cadastrar' : 'Entrar'}
          </button>
        </form>

        <button 
          onClick={() => { setError(''); setIsSignUp(!isSignUp); }}
          className="w-full text-center mt-6 text-[10px] uppercase font-bold text-gray-500 hover:text-blue-500"
        >
          {isSignUp ? 'Já tem conta? Entrar' : 'Novo por aqui? Criar conta'}
        </button>
      </div>
    </motion.div>
  );
}
