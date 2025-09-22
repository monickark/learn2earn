import React, { memo, useState, useEffect, useRef } from 'react';

const VirtualizedList = memo(function VirtualizedList({ 
  items, 
  itemHeight = 60, 
  containerHeight = 400, 
  renderItem 
}) {
  const [scrollTop, setScrollTop] = useState(0);
  const [containerRef, setContainerRef] = useState(null);

  const totalHeight = items.length * itemHeight;
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleCount + 1, items.length);

  const visibleItems = items.slice(startIndex, endIndex);

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  return (
    <div
      ref={setContainerRef}
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={handleScroll}
      className="scrollbar-hide"
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${startIndex * itemHeight}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0
          }}
        >
          {visibleItems.map((item, index) => (
            <div
              key={startIndex + index}
              style={{ height: itemHeight }}
            >
              {renderItem(item, startIndex + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default VirtualizedList;
