// src/components/forms/TopicForm.jsx
import React, { useState } from 'react';

export default function TopicForm({ onSubmit }) {
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState('Beginner');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (topic.trim()) {
      onSubmit(topic, level);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-4 items-center"
    >
      <input
        type="text"
        placeholder="Enter a topic (e.g., Blockchain)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <select
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Expert">Expert</option>
      </select>
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md transition-all"
      >
        <span className="group-hover:hidden">Craft My Lesson</span>
        <span className="hidden group-hover:inline">Just takes a few seconds!</span>
      </button>
    </form>
  );
}
