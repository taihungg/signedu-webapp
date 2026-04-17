export interface Story {
  id: string;
  title: string;
  description: string;
  chapter: number;
  totalChapters: number;
  isNew: boolean;
  wordsLearned: number;
  totalWords: number;
  content: string;
  words?: string[];
}

export interface Vocabulary {
  word: string;
  videoId: string; // YouTube Video ID
  meaning: string;
}

export const mockStories: Story[] = [
  {
    id: 'story-1',
    title: 'Giao tiếp hiệu quả với Người Điếc',
    description: 'Học ngôn ngữ ký hiệu qua câu chuyện thực tế.',
    chapter: 1,
    totalChapters: 1,
    isNew: true,
    wordsLearned: 4,
    totalWords: 6,
    content: "Gia đình tôi gồm bốn người: Bố, Mẹ, Anh trai và Tôi. Chúng tôi sống hạnh phúc cùng nhau. Cả nhà thường đi dạo vào cuối tuần và ăn tối cùng nhau."
  },
  {
    id: 'story-2',
    title: 'Sinh nhật bất ngờ',
    description: 'Một bữa tiệc bất ngờ khiến người thân nhìn nhận thân thiết thêm.',
    chapter: 2,
    totalChapters: 2,
    isNew: true,
    wordsLearned: 2,
    totalWords: 7,
    content: "Hôm nay là sinh nhật của con gái tôi. Tôi đã chuẩn bị một chiếc Bánh kem thật to và một món Quà bé nhỏ nhưng ý nghĩa."
  },
  {
    id: 'story-3',
    title: 'An ủi em gái nhỏ',
    description: 'Ngọt ngào! Làm thế nào để an ủi em gái nhỏ?',
    chapter: 3,
    totalChapters: 3,
    isNew: true,
    wordsLearned: 0,
    totalWords: 8,
    content: "Em gái tôi đang Khóc vì điểm kém. Tôi đã ôm em và nói rằng mọi chuyện sẽ Ổn thôi."
  }
];

export const mockVocabulary: Record<string, Vocabulary> = {
  'Mẹ': {
    word: 'Mẹ',
    videoId: '0mngs5T1a3s', // Mock ID
    meaning: 'Người phụ nữ sinh ra bạn (Mother)'
  },
  'Bố': {
    word: 'Bố',
    videoId: 'kJQP7kiw5Fk', // Mock ID
    meaning: 'Người đàn ông sinh ra bạn (Father)'
  },
  'Anh trai': {
    word: 'Anh trai',
    videoId: '9bZkp7q19f0', // Mock ID
    meaning: 'Người con trai cùng cha mẹ sinh ra trước bạn (Older Brother)'
  },
  'Tôi': {
    word: 'Tôi',
    videoId: 'd5dcd23h', // Mock ID
    meaning: 'Bản thân (Me / I)'
  },
  'Bánh kem': {
    word: 'Bánh kem',
    videoId: '2vjPBrBU-TM', // Mock ID
    meaning: 'Bánh ngọt (Cake)'
  },
  'Quà': {
    word: 'Quà',
    videoId: 'fJ9rUzIMcZQ', // Mock ID
    meaning: 'Món quà (Gift)'
  },
  'Khóc': {
    word: 'Khóc',
    videoId: 'dQw4w9WgXcQ', // Mock ID
    meaning: 'Rơi nước mắt (Cry)'
  },
  'Ổn': {
    word: 'Ổn',
    videoId: 'y6120QOlsfU', // Mock ID
    meaning: 'Bình thường, tốt đẹp (Fine/Okay)'
  }
};
