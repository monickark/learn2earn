export function parseMCQs(rawText) {
  const mcqBlocks = rawText.split(/\n(?=\d+\.)/); // Split by MCQ blocks
  const mcqs = mcqBlocks.map((block) => {
    const lines = block.trim().split('\n').filter(Boolean);
    const questionLine = lines[0];
    const question = questionLine.replace(/^\d+\.\s*/, '').trim();

    const options = [];
    let answer = '';

    lines.slice(1).forEach((line) => {
      const match = line.match(/^([A-D])\)\s*(.*?)(\s*\*correct)?$/i);
      if (match) {
        const label = match[1].toUpperCase();
        const text = match[2].trim();
        const isCorrect = Boolean(match[3]);
        options.push({ label, text });
        if (isCorrect) answer = label;
      }
    });

    return { question, options, answer };
  });

  return mcqs;
}
