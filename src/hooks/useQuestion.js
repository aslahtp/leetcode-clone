import { useState, useEffect } from 'react';
import axios from 'axios';

export const useQuestion = (questionId = 1) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:3000/questions/${questionId}`);
                const data = response.data;

                setTitle(data.title);
                setDescription(data.description);
                setDifficulty(data.difficulty || "Easy");
                setError(null);
            } catch (err) {
                console.error('Error fetching question:', err);
                setTitle("Error loading question");
                setDescription("Failed to fetch the question. Please check the server status.");
                setDifficulty("Unknown");
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestion();
    }, [questionId]);

    return {
        title,
        description,
        difficulty,
        loading,
        error
    };
}; 