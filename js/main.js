// 메인 로직

let currentKeyword = null;
let currentCombinationIndex = 0;

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
  initializePage();
});

// 페이지 초기화
function initializePage() {
  // 키워드 버튼 이벤트 리스너
  const keywordButtons = document.querySelectorAll('.keyword-btn');
  keywordButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const keyword = btn.dataset.keyword;
      selectKeyword(keyword);
    });
  });

  // 랜덤 추천 버튼
  const randomBtn = document.getElementById('random-btn');
  if (randomBtn) {
    randomBtn.addEventListener('click', showRandomCombination);
  }

  // 즐겨찾기 버튼
  const favoriteBtn = document.getElementById('favorite-btn');
  if (favoriteBtn) {
    favoriteBtn.addEventListener('click', saveCurrentCombination);
  }

  // 팔레트 복사 버튼
  const copyBtn = document.getElementById('copy-palette-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', copyPalette);
  }

  // 다크모드 토글
  const darkModeBtn = document.getElementById('dark-mode-btn');
  if (darkModeBtn) {
    darkModeBtn.addEventListener('click', toggleDarkMode);
    // 저장된 다크모드 설정 불러오기
    loadDarkModePreference();
  }

  // 모달 닫기 버튼
  const modalClose = document.querySelector('.modal-close');
  const modalOverlay = document.querySelector('.modal-overlay');
  const fontModal = document.getElementById('font-modal');
  
  if (modalClose) {
    modalClose.addEventListener('click', closeFontModal);
  }
  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeFontModal);
  }

  // ESC 키로 모달 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeFontModal();
    }
  });
}

// 키워드 선택
function selectKeyword(keyword) {
  currentKeyword = keyword;
  currentCombinationIndex = 0;
  showCombination(keyword, 0);
  
  // 추천 영역 표시
  const recommendationSection = document.getElementById('recommendation-section');
  if (recommendationSection) {
    recommendationSection.style.display = 'block';
    recommendationSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// 조합 표시
function showCombination(keyword, index) {
  const combinations = styleData[keyword];
  if (!combinations || combinations.length === 0) return;

  const combination = combinations[index % combinations.length];
  currentCombinationIndex = index % combinations.length;

  // 팔레트 표시
  displayPalette(combination.palette);

  // 컬러 조합 추천 표시
  displayColorCombination(combination.palette);

  // 폰트 표시
  displayFonts(combination.fonts);

  // 설명 및 제안 문구 표시
  displayDescription(combination.description, combination.suggestion);

  // 키워드 표시
  const keywordDisplay = document.getElementById('current-keyword');
  if (keywordDisplay) {
    keywordDisplay.textContent = keyword;
  }
}

// 팔레트 표시
function displayPalette(palette) {
  const paletteContainer = document.getElementById('palette-container');
  if (!paletteContainer) return;

  paletteContainer.innerHTML = '';
  palette.forEach((color, index) => {
    const colorChip = document.createElement('div');
    colorChip.className = 'color-chip';
    colorChip.style.backgroundColor = color;
    colorChip.dataset.color = color;
    
    const hexCode = document.createElement('span');
    hexCode.className = 'hex-code';
    hexCode.textContent = color;
    
    colorChip.appendChild(hexCode);
    paletteContainer.appendChild(colorChip);

    // 색상칩 클릭 시 HEX 코드 복사
    colorChip.addEventListener('click', () => {
      copyToClipboard(color);
      showToast(`${color} 복사되었습니다!`);
    });
  });
}

// 폰트 표시
function displayFonts(fonts) {
  const fontsContainer = document.getElementById('fonts-container');
  if (!fontsContainer) return;

  fontsContainer.innerHTML = '';
  fonts.forEach(font => {
    const fontItem = document.createElement('div');
    fontItem.className = 'font-item';
    fontItem.style.cursor = 'pointer';
    
    const fontName = document.createElement('div');
    fontName.className = 'font-name';
    fontName.textContent = font;
    fontName.style.fontFamily = `'${font}', serif`;
    
    const exampleText = document.createElement('div');
    exampleText.className = 'font-example';
    exampleText.textContent = 'The quick brown fox jumps over the lazy dog';
    exampleText.style.fontFamily = `'${font}', serif`;
    
    // 폰트 클릭 시 다운로드 링크 모달 표시
    fontItem.addEventListener('click', () => {
      showFontDownloadModal(font);
    });
    
    fontItem.appendChild(fontName);
    fontItem.appendChild(exampleText);
    fontsContainer.appendChild(fontItem);
  });
}

// 폰트 다운로드 모달 표시
function showFontDownloadModal(fontName) {
  const modal = document.getElementById('font-modal');
  const modalFontName = document.getElementById('modal-font-name');
  const downloadLink = document.getElementById('font-download-link');
  const webLink = document.getElementById('font-weblink');
  
  if (!modal) return;
  
  // 폰트 이름을 Google Fonts URL 형식으로 변환 (공백을 +로 변경)
  const fontSlug = fontName.replace(/\s+/g, '+');
  
  modalFontName.textContent = fontName;
  downloadLink.href = `https://fonts.google.com/specimen/${fontSlug}`;
  webLink.href = `https://fonts.google.com/specimen/${fontSlug}?query=${fontSlug}`;
  
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

// 폰트 모달 닫기
function closeFontModal() {
  const modal = document.getElementById('font-modal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

// 컬러 조합 추천 표시
function displayColorCombination(palette) {
  const container = document.getElementById('color-combination-container');
  if (!container) return;

  const recommendation = analyzeColorCombination(palette);
  
  container.innerHTML = '';
  
  // 각 추천 조합을 카드 형태로 표시
  Object.keys(recommendation).forEach(role => {
    const color = recommendation[role];
    if (!color) return;
    
    const card = document.createElement('div');
    card.className = 'combination-card';
    
    const label = document.createElement('div');
    label.className = 'combination-label';
    label.textContent = getRoleLabel(role);
    
    const colorDisplay = document.createElement('div');
    colorDisplay.className = 'combination-color';
    colorDisplay.style.backgroundColor = color;
    colorDisplay.dataset.color = color;
    
    const hexCode = document.createElement('div');
    hexCode.className = 'combination-hex';
    hexCode.textContent = color;
    
    // 클릭 시 복사
    card.addEventListener('click', () => {
      copyToClipboard(color);
      showToast(`${getRoleLabel(role)} 색상 (${color}) 복사되었습니다!`);
    });
    
    card.appendChild(label);
    card.appendChild(colorDisplay);
    card.appendChild(hexCode);
    container.appendChild(card);
  });
}

// 역할 라벨 반환
function getRoleLabel(role) {
  const labels = {
    primary: '주색상 (Primary)',
    secondary: '보조색상 (Secondary)',
    accent: '강조색상 (Accent)',
    background: '배경색 (Background)',
    text: '텍스트 색상 (Text)'
  };
  return labels[role] || role;
}

// 컬러 조합 분석
function analyzeColorCombination(palette) {
  if (!palette || palette.length === 0) return {};
  
  // 색상을 RGB로 변환하고 밝기 계산
  const colorsWithData = palette.map(color => ({
    hex: color,
    rgb: hexToRgb(color),
    brightness: getBrightness(color),
    saturation: getSaturation(color)
  }));
  
  // 밝기 순으로 정렬
  const sortedByBrightness = [...colorsWithData].sort((a, b) => b.brightness - a.brightness);
  
  const result = {};
  
  // 가장 밝은 색상 = 배경색
  result.background = sortedByBrightness[0].hex;
  
  // 가장 어두운 색상 = 텍스트 색상
  result.text = sortedByBrightness[sortedByBrightness.length - 1].hex;
  
  // 밝기가 중간인 색상들 중 채도가 높은 것 = 주색상
  const midBrightness = sortedByBrightness.filter(c => 
    c.brightness > 0.3 && c.brightness < 0.7
  );
  if (midBrightness.length > 0) {
    const primary = midBrightness.sort((a, b) => b.saturation - a.saturation)[0];
    result.primary = primary.hex;
  } else {
    // 중간 밝기가 없으면 밝기 순으로 중간값
    const midIndex = Math.floor(sortedByBrightness.length / 2);
    result.primary = sortedByBrightness[midIndex].hex;
  }
  
  // 주색상이 아닌 다른 중간 밝기 색상 = 보조색상
  const secondaryCandidates = midBrightness.filter(c => c.hex !== result.primary);
  if (secondaryCandidates.length > 0) {
    result.secondary = secondaryCandidates[0].hex;
  } else {
    // 중간 밝기에서 가장 가까운 것 선택
    const secondaryIndex = Math.floor(sortedByBrightness.length / 3);
    if (sortedByBrightness[secondaryIndex] && sortedByBrightness[secondaryIndex].hex !== result.primary) {
      result.secondary = sortedByBrightness[secondaryIndex].hex;
    }
  }
  
  // 가장 채도가 높은 색상 = 강조색상
  const sortedBySaturation = [...colorsWithData].sort((a, b) => b.saturation - a.saturation);
  const accent = sortedBySaturation.find(c => 
    c.hex !== result.primary && 
    c.hex !== result.secondary && 
    c.hex !== result.background && 
    c.hex !== result.text
  ) || sortedBySaturation[0];
  
  if (accent && accent.hex !== result.primary && accent.hex !== result.secondary) {
    result.accent = accent.hex;
  }
  
  return result;
}

// HEX를 RGB로 변환
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// 밝기 계산 (0-1 범위)
function getBrightness(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  // 상대적 밝기 공식 (Luminance)
  return (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
}

// 채도 계산 (간단한 버전)
function getSaturation(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  const max = Math.max(rgb.r, rgb.g, rgb.b);
  const min = Math.min(rgb.r, rgb.g, rgb.b);
  if (max === 0) return 0;
  return (max - min) / max;
}

// 설명 및 제안 문구 표시
function displayDescription(description, suggestion) {
  const descriptionEl = document.getElementById('description');
  const suggestionEl = document.getElementById('suggestion');
  
  if (descriptionEl) {
    descriptionEl.textContent = description;
  }
  
  if (suggestionEl) {
    suggestionEl.textContent = suggestion || '';
  }
}

// 랜덤 조합 표시
function showRandomCombination() {
  if (!currentKeyword) return;
  
  const combinations = styleData[currentKeyword];
  if (!combinations || combinations.length === 0) return;

  // 현재 인덱스와 다른 랜덤 인덱스 선택
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * combinations.length);
  } while (randomIndex === currentCombinationIndex && combinations.length > 1);

  showCombination(currentKeyword, randomIndex);
}

// 현재 조합 저장
function saveCurrentCombination() {
  if (!currentKeyword) {
    showToast('먼저 키워드를 선택해주세요.');
    return;
  }

  const combinations = styleData[currentKeyword];
  const combination = combinations[currentCombinationIndex];
  
  const dataToSave = {
    keyword: currentKeyword,
    palette: combination.palette,
    fonts: combination.fonts,
    description: combination.description,
    suggestion: combination.suggestion
  };

  const saved = saveCombination(dataToSave);
  if (saved) {
    showToast('저장되었습니다!');
    // 버튼 애니메이션
    const favoriteBtn = document.getElementById('favorite-btn');
    if (favoriteBtn) {
      favoriteBtn.classList.add('saved');
      setTimeout(() => {
        favoriteBtn.classList.remove('saved');
      }, 500);
    }
  } else {
    showToast('이미 저장된 조합입니다.');
  }
}

// 팔레트 전체 복사
function copyPalette() {
  if (!currentKeyword) return;

  const combinations = styleData[currentKeyword];
  const combination = combinations[currentCombinationIndex];
  const paletteString = combination.palette.join(', ');
  
  copyToClipboard(paletteString);
  showToast('팔레트가 복사되었습니다!');
}

// 클립보드에 복사
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).catch(err => {
    console.error('복사 실패:', err);
    // 폴백: 텍스트 영역 사용
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  });
}

// 토스트 메시지 표시
function showToast(message) {
  // 기존 토스트 제거
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  // 애니메이션
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  // 자동 제거
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 2000);
}

// 다크모드 토글
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('styleMatcher_darkMode', isDarkMode);
  
  const darkModeBtn = document.getElementById('dark-mode-btn');
  if (darkModeBtn) {
    darkModeBtn.textContent = isDarkMode ? '☀️ 라이트 모드' : '🌙 다크 모드';
  }
}

// 다크모드 설정 불러오기
function loadDarkModePreference() {
  const saved = localStorage.getItem('styleMatcher_darkMode');
  if (saved === 'true') {
    document.body.classList.add('dark-mode');
    const darkModeBtn = document.getElementById('dark-mode-btn');
    if (darkModeBtn) {
      darkModeBtn.textContent = '☀️ 라이트 모드';
    }
  }
}

