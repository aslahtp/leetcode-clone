import { useState, useEffect } from 'react';
import axios from 'axios';

export const useQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:3000/questions');
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