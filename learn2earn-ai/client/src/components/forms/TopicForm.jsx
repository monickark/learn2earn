// src/components/forms/TopicForm.jsx
import React, { useState, memo, useCallback, useEffect } from 'react';

const TopicForm = memo(function TopicForm({ onSubmit, externalTopic = '', onTopicChange }) {
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState('Beginner');

  useEffect(() => {
    if (externalTopic && externalTopic !== topic) {
      setTopic(externalTopic);
    }
  }, [externalTopic]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (topic.trim()) {
      onSubmit(topic, level);
    }
  }, [topic, level, onSubmit]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-4xl mx-auto"
    >
      <input
        type="text"
        placeholder="Enter a topic (e.g., Blockchain)"
        value={topic}
        onChange={(e) => {
          setTopic(e.target.value);
          onTopicChange && onTopicChange(e.target.value);
        }}
        className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
      />
      <select
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base min-w-[140px]"
      >
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Expert">Expert</option>
      </select>
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 sm:px-6 py-3 rounded-md transition-all text-sm sm:text-base font-medium whitespace-nowrap"
      >
        <span className="group-hover:hidden">Craft My Lesson</span>
        <span className="hidden group-hover:inline">Just takes a few seconds!</span>
      </button>
    </form>
  );
});

export default TopicForm;
