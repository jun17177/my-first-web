export interface Driver {
  id: number;
  name: string;
  team: string;
  number: number;
  nationality: string;
  teamColor: string;
  championships: number;
  bio: string[];
}

export const drivers: Driver[] = [
  {
    id: 1, name: "Max Verstappen", team: "Red Bull Racing", number: 1,
    nationality: "NED", teamColor: "#3671C6", championships: 4,
    bio: [
      "막스 페르스타펜은 2015년 토로로소(현 레이싱 불스)에서 역대 최연소 F1 드라이버로 데뷔했다. 이듬해 레드불로 이적한 뒤 스페인 GP에서 최연소 우승 기록을 세우며 세계의 주목을 받았다.",
      "2021년부터 2024년까지 4시즌 연속 드라이버 챔피언십을 차지하며 F1 역사상 손꼽히는 지배적인 드라이버로 자리매김했다. 특유의 공격적 오버테이킹과 정밀한 레이스 페이스 관리가 강점이다.",
    ],
  },
  {
    id: 2, name: "Liam Lawson", team: "Red Bull Racing", number: 30,
    nationality: "NZL", teamColor: "#3671C6", championships: 0,
    bio: [
      "리암 로슨은 뉴질랜드 출신으로 레드불 주니어 아카데미를 통해 F1에 입문했다. 2023년 알파타우리(현 레이싱 불스)에서 부상으로 결장한 다니엘 리카도를 대신해 5레이스를 뛰며 강한 인상을 남겼다.",
      "2025년 레이싱 불스에서 풀타임 시트를 확보했고, 2026년 페르스타펜의 파트너로 레드불 메인 팀에 합류했다. 거친 레이스 페이스와 빠른 학습 능력이 돋보이는 신예다.",
    ],
  },
  {
    id: 3, name: "Charles Leclerc", team: "Ferrari", number: 16,
    nationality: "MON", teamColor: "#E8002D", championships: 0,
    bio: [
      "샤를 르클레르는 모나코 출신으로 페라리 아카데미를 거쳐 2019년 스쿠데리아 페라리에 합류했다. 데뷔 첫 시즌 바레인과 이탈리아 GP에서 연속 폴-투-윈을 달성하며 차세대 스타로 떠올랐다.",
      "모나코 GP에서는 홈 팬들의 절대적인 지지를 받으며 2024년 드디어 첫 홈 레이스 우승을 차지했다. 단일 랩 퍼포먼스와 감각적인 드라이빙 스타일로 예선에서 특히 강한 면모를 보인다.",
    ],
  },
  {
    id: 4, name: "Lewis Hamilton", team: "Ferrari", number: 44,
    nationality: "GBR", teamColor: "#E8002D", championships: 7,
    bio: [
      "루이스 해밀턴은 F1 역사상 최다인 7번의 드라이버 챔피언십을 보유한 전설이다. 2007년 맥라렌에서 데뷔해 이듬해 첫 타이틀을 획득했으며, 2013년 메르세데스 이적 후 전성기를 맞이했다.",
      "2025년 메르세데스를 떠나 페라리로 이적하며 커리어의 새로운 챕터를 열었다. 최다 우승(103회)·폴포지션 등 수많은 기록을 보유하며 다양성과 포용성 증진 활동에도 적극적이다.",
    ],
  },
  {
    id: 5, name: "Lando Norris", team: "McLaren", number: 4,
    nationality: "GBR", teamColor: "#FF8000", championships: 0,
    bio: [
      "란도 노리스는 2019년 맥라렌에서 데뷔한 이래 팀의 부흥을 이끈 핵심 드라이버다. 특유의 유머와 소통 능력으로 SNS에서 전 세계 팬들의 사랑을 받는다.",
      "2024년 맥라렌의 경쟁력이 절정에 달하면서 처음으로 드라이버 챔피언십 타이틀을 놓고 페르스타펜과 경쟁했다. 2026년에도 챔피언십 도전을 이어가고 있다.",
    ],
  },
  {
    id: 6, name: "Oscar Piastri", team: "McLaren", number: 81,
    nationality: "AUS", teamColor: "#FF8000", championships: 0,
    bio: [
      "오스카 피아스트리는 2022년 F2 챔피언 출신으로, 알파인의 계약 논란 끝에 2023년 맥라렌 시트를 확보하며 화려하게 F1에 데뷔했다.",
      "차분하고 실수 없는 드라이빙으로 빠르게 팀 내 존재감을 키웠으며, 2024년에는 복수의 레이스 우승을 달성했다. 노리스와 함께 맥라렌의 황금기를 이끄는 쌍두마차로 활약 중이다.",
    ],
  },
  {
    id: 7, name: "George Russell", team: "Mercedes", number: 63,
    nationality: "GBR", teamColor: "#27F4D2", championships: 0,
    bio: [
      "조지 러셀은 2022년 메르세데스에 합류하기 전 윌리엄스에서 3년간 활약하며 한정된 머신으로도 두각을 나타냈다. '미스터 새터데이'라는 별명답게 예선 퍼포먼스가 뛰어나다.",
      "2022년 브라질 GP 첫 우승 이후 메르세데스의 재건을 이끄는 리더로 성장했다. 데이터 분석과 기술적 피드백 능력이 뛰어나 엔지니어링 팀과의 협업에서 강점을 발휘한다.",
    ],
  },
  {
    id: 8, name: "Kimi Antonelli", team: "Mercedes", number: 12,
    nationality: "ITA", teamColor: "#27F4D2", championships: 0,
    bio: [
      "안드레아 키미 안토넬리는 이탈리아 출신의 슈퍼 루키로, 메르세데스 주니어 아카데미에서 조기 발탁된 촉망받는 신예다. 2024년 F2에서 압도적인 퍼포먼스로 챔피언을 차지했다.",
      "해밀턴의 뒤를 이어 2025년 메르세데스 F1 시트를 꿰찼으며, 2026년에도 팀의 미래로 주목받고 있다. 젊은 나이답지 않은 침착함과 빠른 적응력이 돋보인다.",
    ],
  },
  {
    id: 9, name: "Fernando Alonso", team: "Aston Martin", number: 14,
    nationality: "ESP", teamColor: "#229971", championships: 2,
    bio: [
      "페르난도 알론소는 2005년과 2006년 연속 챔피언을 차지한 F1의 살아있는 전설이다. 르노, 맥라렌, 페라리 등을 거치며 굴곡진 커리어를 보냈고, 2021년 알파인으로 복귀해 건재함을 과시했다.",
      "2023년 애스턴 마틴 이적 후 시즌 초반 폭발적인 레이스 페이스로 팬들을 열광시켰다. 40대에도 현역 최정상급 레이스 능력을 유지하는 놀라운 노련함의 소유자다.",
    ],
  },
  {
    id: 10, name: "Lance Stroll", team: "Aston Martin", number: 18,
    nationality: "CAN", teamColor: "#229971", championships: 0,
    bio: [
      "랜스 스트롤은 캐나다 출신으로 아버지 로렌스 스트롤이 오너로 있는 애스턴 마틴에서 활약 중이다. 2017년 윌리엄스에서 F1 데뷔했으며, 빗길 레이스와 특정 서킷에서 강한 면모를 보여왔다.",
      "팀 내 알론소와의 경쟁에서 경험을 쌓으며 성장을 이어가고 있다. 2026년에도 팀의 발전과 함께 개인 기량 향상을 노리고 있다.",
    ],
  },
  {
    id: 11, name: "Pierre Gasly", team: "Alpine", number: 10,
    nationality: "FRA", teamColor: "#FF87BC", championships: 0,
    bio: [
      "피에르 가슬리는 레드불 주니어 출신으로, 레드불 메인 팀에서 어려움을 겪은 뒤 알파타우리(현 레이싱 불스)로 강등되어 재도약했다. 2020년 이탈리아 GP에서 감동적인 첫 우승을 차지했다.",
      "2023년 알파인으로 이적해 프랑스 팬들의 응원을 등에 업고 팀을 이끌고 있다. 꾸준한 포인트 수확과 레이스 운영 능력이 베테랑으로서의 면모를 보여준다.",
    ],
  },
  {
    id: 12, name: "Jack Doohan", team: "Alpine", number: 7,
    nationality: "AUS", teamColor: "#FF87BC", championships: 0,
    bio: [
      "잭 두한은 F1 레전드 미크 두한의 아들로, 알파인 아카데미 출신이다. F2에서 강한 퍼포먼스를 선보인 끝에 2025년 풀타임 F1 시트를 확보했다.",
      "이름값에 걸맞게 거침없는 레이싱 스타일을 구사하며 주목받고 있다. 아직 신예이지만 빠른 적응력과 공격적인 드라이빙으로 팬들의 기대를 한 몸에 받고 있다.",
    ],
  },
  {
    id: 13, name: "Alex Albon", team: "Williams", number: 23,
    nationality: "THA", teamColor: "#64C4FF", championships: 0,
    bio: [
      "알렉스 알본은 태국계 영국인으로 레드불 주니어 아카데미 출신이다. 레드불 메인 팀에서 어려움을 겪은 뒤 윌리엄스로 이적해 오히려 팀의 리더로 거듭났다.",
      "한정된 머신 성능에도 꾸준히 포인트를 뽑아내는 능력이 인정받고 있으며, 팀 내에서 후배 드라이버를 이끄는 리더십도 높이 평가받는다.",
    ],
  },
  {
    id: 14, name: "Carlos Sainz", team: "Williams", number: 55,
    nationality: "ESP", teamColor: "#64C4FF", championships: 0,
    bio: [
      "카를로스 사인스는 '부드러운 운영자(Smooth Operator)'라는 별명처럼 일관된 퍼포먼스와 안정적인 레이스 운영으로 유명하다. 토로로소, 르노, 맥라렌, 페라리를 거친 풍부한 경력을 보유하고 있다.",
      "2025년 페라리를 떠나 윌리엄스에 합류했으며, 팀 부흥의 핵심 인물로 기대를 모으고 있다. 2023년 싱가포르 GP 우승을 포함해 커리어 내 꾸준한 성과를 이어왔다.",
    ],
  },
  {
    id: 15, name: "Yuki Tsunoda", team: "Racing Bulls", number: 22,
    nationality: "JPN", teamColor: "#6692FF", championships: 0,
    bio: [
      "유키 쓰노다는 레이싱 불스(구 알파타우리)에서 활약 중인 일본인 드라이버로, 작은 체구와 달리 불같은 레이싱 본능으로 유명하다. 무선 통신에서의 거침없는 발언도 팬들 사이에서 화제가 된다.",
      "해를 거듭할수록 실수를 줄이고 레이스 운영 능력을 개선하며 성장하는 모습을 보여주고 있다. 일본 팬들의 절대적인 지지를 받으며 F1 내 일본 드라이버의 자존심을 지키고 있다.",
    ],
  },
  {
    id: 16, name: "Isack Hadjar", team: "Racing Bulls", number: 6,
    nationality: "FRA", teamColor: "#6692FF", championships: 0,
    bio: [
      "이삭 아자르는 프랑스-알제리 혼혈 드라이버로 레드불 주니어 아카데미에서 발탁됐다. 2024년 F2 챔피언십에서 치열한 경쟁 끝에 뛰어난 실력을 입증했다.",
      "2025년 레이싱 불스에서 F1 데뷔를 신고했으며, 레드불 패밀리의 차세대 기대주로 주목받고 있다. 빠른 적응력과 자신감 넘치는 드라이빙이 강점이다.",
    ],
  },
  {
    id: 17, name: "Esteban Ocon", team: "Haas", number: 31,
    nationality: "FRA", teamColor: "#B6BABD", championships: 0,
    bio: [
      "에스테반 오콩은 메르세데스 주니어 출신으로 포스 인디아, 르노/알파인 등을 거친 베테랑이다. 2021년 헝가리 GP에서 극적인 첫 우승을 차지하며 강한 인상을 남겼다.",
      "2025년 알파인을 떠나 하스로 이적하며 새로운 도전을 시작했다. 팀 재건에 기여하는 경험 많은 드라이버로서의 역할을 기대받고 있다.",
    ],
  },
  {
    id: 18, name: "Oliver Bearman", team: "Haas", number: 87,
    nationality: "GBR", teamColor: "#B6BABD", championships: 0,
    bio: [
      "올리버 베어만은 페라리 아카데미 출신의 영국인 신예로, 2024년 사우디아라비아 GP에서 페라리 대신 출전해 7위를 기록하며 깊은 인상을 남겼다.",
      "2025년 하스에서 풀타임 시트를 확보했으며, 차분하고 성숙한 레이싱 스타일로 많은 기대를 받는 미래의 스타다.",
    ],
  },
  {
    id: 19, name: "Nico Hülkenberg", team: "Kick Sauber", number: 27,
    nationality: "GER", teamColor: "#52E252", championships: 0,
    bio: [
      "니코 휠켄베르그는 '헐크'라는 애칭으로 불리는 독일 출신 베테랑으로, 커리어 내 177회 이상의 레이스에서 단 한 번도 포디엄에 오르지 못한 특이한 기록을 보유하고 있었다. 2023년 아우디가 인수한 킥 자우버에서 새 출발을 했다.",
      "풍부한 경험과 뛰어난 타이어 관리 능력으로 팀 개발에 크게 기여하고 있다. 2026년 아우디 공식 팀 전환을 앞두고 팀의 핵심 리더로 활약 중이다.",
    ],
  },
  {
    id: 20, name: "Gabriel Bortoleto", team: "Kick Sauber", number: 5,
    nationality: "BRA", teamColor: "#52E252", championships: 0,
    bio: [
      "가브리엘 보르토레토는 맥라렌 아카데미 출신의 브라질 드라이버로, 2024년 F2 챔피언을 차지하며 킥 자우버(아우디)의 F1 시트를 확보했다.",
      "브라질이 배출한 차세대 F1 스타로 주목받고 있으며, 아일톤 세나와 펠리페 마사의 뒤를 잇는다는 기대를 한 몸에 받고 있다. 2026년 아우디 공식 팀과 함께 큰 성장이 기대된다.",
    ],
  },
];
