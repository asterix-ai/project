import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import LoadingSpinner from './LoadingSpinner';
import { Send } from 'lucide-react';

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const AuthForm = ({ onSubmit, buttonText, loading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError('');

    if (!emailRegex.test(email)) {
      setEmailError('الرجاء إدخال بريد إلكتروني صالح.');
      return;
    }

    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className=\"space-y-6\">
      <Input
        label=\"البريد الإلكتروني\"
        id=\"email\"
        type=\"email\"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder=\"أدخل بريدك الإلكتروني\"
        error={emailError}
        required
      />
      <Input
        label=\"كلمة المرور\"
        id=\"password\"
        type=\"password\"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder=\"أدخل كلمة المرور\"
        required
      />
      <Button type=\"submit\" className=\"w-full\" disabled={loading} icon={Send}>
        {loading ? <LoadingSpinner loading={loading} size={20} color=\"#fff\" text=\"\" /> : buttonText}
      </Button>
    </form>
  );
};

export default AuthForm;
