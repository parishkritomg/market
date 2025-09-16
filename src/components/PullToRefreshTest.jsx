import React, { useState, useRef, useEffect } from 'react';

const PullToRefreshTest = ({ onRefresh, children }) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const [isAtTopPosition, setIsAtTopPosition] = useState(true);
  const [lastScrollTime, setLastScrollTime] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');

  const containerRef = useRef(null);
  const startY = useRef(0);
  const currentY = useRef(0);
  const scrollTimeoutRef = useRef(null);

  // Ultra-strict top position check
  const checkIsAtTop = () => {
    const windowScrollTop = window.pageYOffset || window.scrollY || 0;
    const documentScrollTop = document.documentElement.scrollTop || 0;
    const bodyScrollTop = document.body.scrollTop || 0;
    const containerScrollTop = containerRef.current?.scrollTop || 0;

    const isAtTop = windowScrollTop === 0 && 
                   documentScrollTop === 0 && 
                   bodyScrollTop === 0 && 
                   containerScrollTop === 0;

    const debugMsg = `Window: ${windowScrollTop}, Doc: ${documentScrollTop}, Body: ${bodyScrollTop}, Container: ${containerScrollTop} = ${isAtTop ? 'AT TOP' : 'NOT AT TOP'}`;
    setDebugInfo(debugMsg);
    console.log('🔍 Position Check:', debugMsg);
    
    return isAtTop;
  };

  // Continuous position monitoring
  useEffect(() => {
    const monitorPosition = () => {
      const isAtTop = checkIsAtTop();
      setIsAtTopPosition(isAtTop);
    };

    monitorPosition();
    const interval = setInterval(monitorPosition, 100);

    return () => clearInterval(interval);
  }, []);

  // Enhanced scroll monitoring
  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      setLastScrollTime(now);
      setIsScrolling(true);
      
      console.log('📜 SCROLL DETECTED at', now);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
        console.log('📜 Scroll ended');
      }, 200);

      checkIsAtTop();
    };

    // Monitor all possible scroll sources
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    
    if (containerRef.current) {
      containerRef.current.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
      if (containerRef.current) {
        containerRef.current.removeEventListener('scroll', handleScroll);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const handleTouchStart = (e) => {
    console.log('👆 TOUCH START');
    
    // ULTRA-AGGRESSIVE PREVENTION
    const now = Date.now();
    const timeSinceScroll = now - lastScrollTime;
    const currentlyAtTop = checkIsAtTop();
    
    console.log(`🚫 Checks: isScrolling=${isScrolling}, timeSinceScroll=${timeSinceScroll}ms, atTop=${currentlyAtTop}`);
    
    // Prevent if ANY of these conditions are true
    if (isScrolling || timeSinceScroll < 300 || !currentlyAtTop || isRefreshing) {
      console.log('🚫 TOUCH BLOCKED - Not safe to start pull');
      setIsPulling(false);
      setPullDistance(0);
      return;
    }

    // Final position verification
    if (!checkIsAtTop()) {
      console.log('🚫 FINAL CHECK FAILED - Not at top');
      return;
    }

    console.log('✅ TOUCH ALLOWED - Starting pull gesture');
    startY.current = e.touches[0].clientY;
    currentY.current = startY.current;
    setIsPulling(true);
  };

  const handleTouchMove = (e) => {
    if (!isPulling || isRefreshing) return;

    // Continuous position verification during pull
    if (!checkIsAtTop()) {
      console.log('🚫 MOVE BLOCKED - Position changed during pull');
      setIsPulling(false);
      setPullDistance(0);
      return;
    }

    currentY.current = e.touches[0].clientY;
    const distance = Math.max(0, currentY.current - startY.current);
    
    if (distance > 0) {
      e.preventDefault();
      setPullDistance(Math.min(distance, 150));
      console.log(`📏 Pull distance: ${distance}px`);
    }
  };

  const handleTouchEnd = () => {
    console.log('👆 TOUCH END');
    
    if (!isPulling) {
      console.log('🚫 Not pulling, ignoring end');
      return;
    }

    // Final verification before triggering refresh
    if (!checkIsAtTop()) {
      console.log('🚫 END BLOCKED - Not at top during end');
      setIsPulling(false);
      setPullDistance(0);
      return;
    }

    if (pullDistance > 80) {
      console.log('🔄 TRIGGERING REFRESH');
      setIsRefreshing(true);
      onRefresh?.().finally(() => {
        setIsRefreshing(false);
        console.log('✅ Refresh completed');
      });
    } else {
      console.log('📏 Pull distance insufficient:', pullDistance);
    }

    setIsPulling(false);
    setPullDistance(0);
  };

  // Mouse events for desktop testing
  const handleMouseDown = (e) => {
    console.log('🖱️ MOUSE DOWN');
    
    const now = Date.now();
    const timeSinceScroll = now - lastScrollTime;
    const currentlyAtTop = checkIsAtTop();
    
    if (isScrolling || timeSinceScroll < 300 || !currentlyAtTop || isRefreshing) {
      console.log('🚫 MOUSE BLOCKED');
      return;
    }

    if (!checkIsAtTop()) {
      console.log('🚫 MOUSE FINAL CHECK FAILED');
      return;
    }

    console.log('✅ MOUSE ALLOWED');
    startY.current = e.clientY;
    currentY.current = startY.current;
    setIsPulling(true);
  };

  const handleMouseMove = (e) => {
    if (!isPulling || isRefreshing) return;

    if (!checkIsAtTop()) {
      console.log('🚫 MOUSE MOVE BLOCKED');
      setIsPulling(false);
      setPullDistance(0);
      return;
    }

    currentY.current = e.clientY;
    const distance = Math.max(0, currentY.current - startY.current);
    
    if (distance > 0) {
      e.preventDefault();
      setPullDistance(Math.min(distance, 150));
    }
  };

  const handleMouseUp = () => {
    console.log('🖱️ MOUSE UP');
    
    if (!isPulling) return;

    if (!checkIsAtTop()) {
      console.log('🚫 MOUSE UP BLOCKED');
      setIsPulling(false);
      setPullDistance(0);
      return;
    }

    if (pullDistance > 80) {
      console.log('🔄 MOUSE TRIGGERING REFRESH');
      setIsRefreshing(true);
      onRefresh?.().finally(() => {
        setIsRefreshing(false);
      });
    }

    setIsPulling(false);
    setPullDistance(0);
  };

  // Mouse event listeners
  useEffect(() => {
    if (isPulling) {
      const handleGlobalMouseMove = (e) => handleMouseMove(e);
      const handleGlobalMouseUp = () => handleMouseUp();

      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isPulling, pullDistance]);

  const pullProgress = Math.min(pullDistance / 80, 1);
  const shouldShowRefresh = pullDistance > 80;

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      style={{ touchAction: 'pan-y' }}
    >
      {/* Debug Info */}
      <div className="fixed top-0 left-0 right-0 bg-black text-white text-xs p-2 z-50">
        <div>Status: {isAtTopPosition ? '✅ AT TOP' : '❌ NOT AT TOP'}</div>
        <div>Scrolling: {isScrolling ? '📜 YES' : '⏸️ NO'}</div>
        <div>Pulling: {isPulling ? '👆 YES' : '⏸️ NO'}</div>
        <div>Distance: {pullDistance.toFixed(0)}px</div>
        <div>{debugInfo}</div>
      </div>

      {/* Pull indicator */}
      {pullDistance > 0 && (
        <div 
          className="absolute top-0 left-0 right-0 flex items-center justify-center bg-blue-500 text-white transition-all duration-200 z-40"
          style={{ 
            height: `${Math.min(pullDistance, 80)}px`,
            transform: `translateY(-${Math.max(0, 80 - pullDistance)}px)`
          }}
        >
          <div className="text-center">
            {shouldShowRefresh ? (
              <div>
                <div className="text-lg">🔄</div>
                <div className="text-sm">Release to refresh</div>
              </div>
            ) : (
              <div>
                <div className="text-lg">⬇️</div>
                <div className="text-sm">Pull to refresh</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <div style={{ paddingTop: '120px' }}>
        {children}
      </div>

      {/* Loading overlay */}
      {isRefreshing && (
        <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="animate-spin text-4xl mb-2">🔄</div>
            <div className="text-lg font-semibold">Refreshing...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PullToRefreshTest;