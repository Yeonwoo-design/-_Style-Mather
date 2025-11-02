// LocalStorage 관리 함수들

const STORAGE_KEY = 'styleMatcher_favorites';

// 저장된 조합 가져오기
function getSavedCombinations() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

// 조합 저장하기
function saveCombination(combination) {
  const saved = getSavedCombinations();
  // 중복 체크 (같은 키워드, 같은 팔레트면 중복으로 간주)
  const isDuplicate = saved.some(item => 
    item.keyword === combination.keyword &&
    JSON.stringify(item.palette) === JSON.stringify(combination.palette)
  );
  
  if (!isDuplicate) {
    saved.push({
      ...combination,
      id: Date.now() // 고유 ID 생성
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    return true;
  }
  return false;
}

// 조합 삭제하기
function deleteCombination(id) {
  const saved = getSavedCombinations();
  const filtered = saved.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

// 모든 조합 삭제하기
function clearAllCombinations() {
  localStorage.removeItem(STORAGE_KEY);
}

