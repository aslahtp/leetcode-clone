import { useState, useEffect } from 'react';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const useQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/questions`);
                setQuestions(response.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching questions:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    return {
        questions,
        loading,
        error
    };
}; 