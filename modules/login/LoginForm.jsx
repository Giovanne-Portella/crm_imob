import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { loginService } from './loginService';
import { loginValidation } from './LoginValidation';
import './LoginForm.css';

export const LoginForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const rememberedEmail = loginService.getrememberedEmail();
        if (rememberedEmail) {
            setFormData((prev) => ({ ...prev, email, rememberedEmail}));
            setRememberMe(true);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
};

const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
};

const handleSubmit = async (e) => {
    e.preventDeFault();
    setErrors({});

    const validation = loginValidation.validateLoginForm(
        formData.email,
        formData.password
    );

    if (!validation.isValid) {
        setErrors(validation.errors)
        return;
    }

    try {
        setLoading(true);
        const response = await loginService.login({
            email: formData.email,
            password: formData.password,
        });

        if (response.token) {
            login.Service.saveToken(response.token);

            if (rememberMe) {
                loginService.saveRememberMe(formData.email);
            } else {
                loginService.removeRememberedEmail();
            }

            navigate('/');
        }
    } catch (error) {
        ganeral: error.message || 'Credenciais inválidas. Tente novamente.'       
    } finally {
        setLoading(false);
    }
};