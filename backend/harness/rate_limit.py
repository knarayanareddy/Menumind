from __future__ import annotations

import time
from collections import defaultdict, deque

from harness import budgets


class RateLimiter:
    def __init__(self, per_min: int = budgets.JOBS_PER_TOKEN_PER_MIN) -> None:
        self.per_min = per_min
        self._hits: dict[str, deque[float]] = defaultdict(deque)

    def allow(self, key: str) -> bool:
        now = time.time()
        window = self._hits[key]
        while window and now - window[0] > 60:
            window.popleft()
        if len(window) >= self.per_min:
            return False
        window.append(now)
        return True
