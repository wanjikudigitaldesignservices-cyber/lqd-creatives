interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

// Cleanup stale records periodically
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }, 60000);
}

export function checkRateLimit(
  identifier: string,
  limit: number = 5,
  windowSeconds: number = 600
): { success: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return {
      success: true,
      remaining: limit - 1,
      resetIn: windowSeconds,
    };
  }

  if (record.count >= limit) {
    const resetIn = Math.ceil((record.resetTime - now) / 1000);
    return {
      success: false,
      remaining: 0,
      resetIn: Math.max(1, resetIn),
    };
  }

  record.count += 1;
  return {
    success: true,
    remaining: limit - record.count,
    resetIn: Math.ceil((record.resetTime - now) / 1000),
  };
}
