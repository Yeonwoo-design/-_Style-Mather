// 스타일 데이터 정의
const styleData = {
  "따뜻한": [
    {
      palette: ["#F5E6CA", "#E8C07D", "#DFA67B", "#A26769", "#6B4423"],
      fonts: ["Noto Serif", "Playfair Display"],
      description: "부드럽고 아늑한 느낌으로, 자연스러운 브랜드에 어울립니다.",
      suggestion: "이 조합은 따뜻한 브랜딩에 잘 어울려요. 카페나 베이커리 같은 공간에 추천합니다."
    },
    {
      palette: ["#FFF5E6", "#FFE4B5", "#D2B48C", "#BC8F8F", "#8B4513"],
      fonts: ["Cormorant Garamond", "Lora"],
      description: "크림색 톤의 부드러운 팔레트로 편안함을 전달합니다.",
      suggestion: "화장품이나 라이프스타일 브랜드에 활용하기 좋은 조합입니다."
    }
  ],
  "모던한": [
    {
      palette: ["#FFFFFF", "#E5E5E5", "#4F4F4F", "#000000", "#636363"],
      fonts: ["Inter", "Roboto"],
      description: "간결하고 세련된 인상을 주는 현대적 스타일입니다.",
      suggestion: "이 조합은 모던한 브랜딩에 잘 어울려요. 테크 기업이나 미니멀한 디자인에 적합합니다."
    },
    {
      palette: ["#F8F9FA", "#E9ECEF", "#495057", "#212529", "#6C757D"],
      fonts: ["Poppins", "Montserrat"],
      description: "회색 톤의 균형잡힌 모던 스타일입니다.",
      suggestion: "프리미엄 서비스나 금융 관련 브랜드에 추천합니다."
    }
  ],
  "레트로한": [
    {
      palette: ["#FFD447", "#FF785A", "#FF3D68", "#A23B72", "#5D2E46"],
      fonts: ["Raleway", "Permanent Marker"],
      description: "감각적인 빈티지 느낌으로, 복고풍 디자인에 적합합니다.",
      suggestion: "이 조합은 레트로한 브랜딩에 잘 어울려요. 패션이나 엔터테인먼트 분야에 활용하기 좋습니다."
    },
    {
      palette: ["#FF6B6B", "#4ECDC4", "#FFE66D", "#95E1D3", "#F38181"],
      fonts: ["Bungee", "Righteous"],
      description: "밝고 생동감 있는 레트로 컬러로 에너지를 전달합니다.",
      suggestion: "레크리에이션이나 이벤트 관련 브랜드에 적합합니다."
    }
  ],
  "미니멀한": [
    {
      palette: ["#FAFAFA", "#F5F5F5", "#E0E0E0", "#9E9E9E", "#424242"],
      fonts: ["Work Sans", "Source Sans Pro"],
      description: "단순하고 깔끔한 미니멀 디자인으로 집중도를 높입니다.",
      suggestion: "이 조합은 미니멀한 브랜딩에 잘 어울려요. 프리미엄 브랜드나 갤러리 같은 공간에 추천합니다."
    },
    {
      palette: ["#FFFFFF", "#F8F8F8", "#D3D3D3", "#A0A0A0", "#808080"],
      fonts: ["Open Sans", "Lato"],
      description: "극도로 단순화된 흑백 팔레트로 클래식을 강조합니다.",
      suggestion: "명품이나 하이엔드 브랜드에 활용하기 좋은 조합입니다."
    }
  ],
  "화려한": [
    {
      palette: ["#FF1744", "#FF9100", "#FFEA00", "#00E676", "#00B0FF"],
      fonts: ["Oswald", "Bebas Neue"],
      description: "강렬하고 역동적인 컬러로 시선을 사로잡습니다.",
      suggestion: "이 조합은 화려한 브랜딩에 잘 어울려요. 패션이나 스포츠 브랜드에 적합합니다."
    },
    {
      palette: ["#E91E63", "#9C27B0", "#3F51B5", "#009688", "#FFC107"],
      fonts: ["Impact", "Fredoka One"],
      description: "다채로운 컬러 조합으로 활기찬 인상을 줍니다.",
      suggestion: "엔터테인먼트나 게임 관련 브랜드에 추천합니다."
    }
  ],
  "빈티지한": [
    {
      palette: ["#8B7355", "#D4A574", "#C9A96B", "#8B6F47", "#5C4033"],
      fonts: ["Cinzel", "Old Standard TT"],
      description: "클래식하고 고급스러운 빈티지 스타일입니다.",
      suggestion: "이 조합은 빈티지한 브랜딩에 잘 어울려요. 와인이나 앤티크 관련 브랜드에 활용하기 좋습니다."
    },
    {
      palette: ["#6B4423", "#8B4513", "#CD853F", "#D2691E", "#A0522D"],
      fonts: ["Playfair Display", "Cormorant"],
      description: "어두운 브라운 톤의 클래식한 빈티지 팔레트입니다.",
      suggestion: "카페나 펍 같은 공간에 추천합니다."
    }
  ]
};

