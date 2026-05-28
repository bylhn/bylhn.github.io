import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataDir = join(__dirname, '../public/data/posts')
mkdirSync(dataDir, { recursive: true })

const posts = [
  {
    id: 48, slug: '48', title: '면접에서 말한 내용은 어떻게 평가될까', tag: '잡지식', created_at: '2026-02-10',
    content: `![면접](https://blog.kakaocdn.net/dna/43HP8/dJMcaa5gRDw/AAAAAAAAAAAAAAAAAAAAAKL4LLS4gIta8xvC8a-0q90v3OcagOdbJvP5Ezyox36l/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1780239599&allow_ip=&allow_referer=&signature=2q%2FxYsfcALjRhaD7n%2Bc0NYNqnhM%3D)

본 자료는 면접 컨설팅 이후 개인 정리 기록입니다.

면접 컨설팅을 통해 얻은 인사이트를 개인적으로 정리한 자료이며, 특정 기관이나 개인의 공식 입장을 대변하지 않습니다.

본 자료는 공유 허락을 받은 범위 내에서 **개인 기록 및 정보 공유 목적**으로 게시합니다.

## 강사 정보

해당 관점을 접하게 된 강사님 정보:

- **강사명**: 김진희
- **전문 분야**: 입시 면접 컨설팅
- 백석대, 중부대 외 다수 대학 면접 특강
- 70여 개 고등학교 면접 입시 생기부 특강 전문

> Instagram: @jin_terview

---

#면접 #면접컨설팅 #김진희고수님`
  },
  {
    id: 47, slug: '47', title: "내일인데 '명일'? | 날짜 관련 회사 언어 이해하기", tag: '잡지식', created_at: '2026-02-04',
    content: `인턴 활동 중 메일 작성법을 공부하면서 반복되는 일자 관련 용어들을 정리했습니다.

## 일자 지시어란?

회사에서 자주 사용되는 **익일, 차일, 금일, 당일, 명일, 작일**을 "일자 지시어"라고 합니다.

## 각 용어별 설명

### 익일 vs 명일
- **익일**: 다음날(내일)을 의미. 택배, 행정 처리 등에 사용
- **명일**: 익일과 동의어이나 공문, 비즈니스 문서에 격식 있게 사용

### 금일
오늘, 당일과 동의어인 격식체 표현. 공지, 안내문, 공식 서류 등에서 자주 등장합니다.

### 당일
오늘을 의미하지만, **지정된 날짜가 있으면** 그 특정 날짜를 강조합니다.
- 예시: "당일 배송" vs "행사 당일에 뵙죠"

### 작일
어제(하루 전날)를 의미. 신문 기사, 보고서, 공문, 연설문 등에서 사건을 객관적으로 서술할 때 사용합니다.

### 차일
명확한 정의가 불명확하며 추가 자료가 필요합니다.

---

본 글은 회사 업무에서 적절한 일자 표현 사용을 돕기 위한 참고 자료입니다.`
  },
  {
    id: 46, slug: '46', title: 'Iotgoat 환경 다운받기', tag: '기타', created_at: '2026-01-11',
    content: `## IoTGoat 환경이란?

> "IoTGoat 환경은 의도적으로 취약하게 설계된 펌웨어 프로젝트로, IoT 기기 보안 취약점을 학습하고 테스트하는 데 사용됩니다."

주로 다음을 수행할 수 있습니다:
- 펌웨어 분석 및 비밀번호 추출
- 운영체제 및 서비스 레벨 공격
- 웹 관리 페이지 공략
- 포스트 익스플로잇

## 1단계: 공식 저장소에서 다운로드

공식 GitHub 저장소: https://github.com/owasp/iotgoat/releases

IoTGoat-x86.vmdk 파일을 다운로드합니다.

![다운로드된 실행파일](https://blog.kakaocdn.net/dna/mSJhM/dJMcacaKtFe/AAAAAAAAAAAAAAAAAAAAADis5zhlLJIirU0oshxGWnTcqEnnEAMgoEvsupHkdFj2/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1780239599&allow_ip=&allow_referer=&signature=dyOUXLMJ1J23fnfaau3%2B%2BMl6D70%3D)

## 2단계: VMware 열기

![VMware 시작화면](https://blog.kakaocdn.net/dna/3Dq91/dJMcac2QZfW/AAAAAAAAAAAAAAAAAAAAALFusn5XKEmtR1m_i8-wpXFdyYI_PUomTXTHYreZ-xRR/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1780239599&allow_ip=&allow_referer=&signature=6nTMTQU1gqAsxglOE94mVKMyvy4%3D)

## 3단계: 새 가상 머신 생성

Home에서 **Create a New Virtual Machine** 클릭

![새 가상머신 생성](https://blog.kakaocdn.net/dna/nMSTw/dJMcabpmLk0/AAAAAAAAAAAAAAAAAAAAAI6QGeHeYBpMNwhAtVHXgxulLea2jMYvcT_QE9rnpv0n/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1780239599&allow_ip=&allow_referer=&signature=1iVSj06o4JzRqmrTrkvu6n72fsk%3D)

![구성 옵션](https://blog.kakaocdn.net/dna/0DFmw/dJMb99LQIsc/AAAAAAAAAAAAAAAAAAAAABnSvdyoDxXm0mSX9usbgpSknUIkEiBNckbjuQ_tsYM0/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1780239599&allow_ip=&allow_referer=&signature=jjUGyFiegk6Sd3JnYddhCyUk%2Fg4%3D)

"I will install" 옵션 선택 (이미 만들어진 디스크 이미지 사용 목적)

## 4단계: 머신 이름 설정

![머신 이름 지정](https://blog.kakaocdn.net/dna/P5vYO/dJMcagRKE60/AAAAAAAAAAAAAAAAAAAAANZo9-JMmopRM05VnJP0UQk2TdhzFLh4RMd4HbHq8H5B/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1780239599&allow_ip=&allow_referer=&signature=9C0nF90pGIGUNszQCwI6wZR6PH8%3D)

Virtual machine name을 입력합니다.

## 5단계: 디스크 용량 설정

![디스크 용량](https://blog.kakaocdn.net/dna/bF3Unf/dJMcad1J4iJ/AAAAAAAAAAAAAAAAAAAAALy8Cjqv-r363MGDJXYDaqGn2qjynB8O0jGzm31QkJqp/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1780239599&allow_ip=&allow_referer=&signature=VBeclogk7wL1UBkrFzfzdScSrg4%3D)

용량을 15GB로 설정합니다.

## 6단계: 하드 디스크 교체

![머신 설정](https://blog.kakaocdn.net/dna/dQieQb/dJMcaiaXZOY/AAAAAAAAAAAAAAAAAAAAACsfv3yNjMsqwJS6eiBVfs-SNTacYXLN91LPnILntE6A/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1780239599&allow_ip=&allow_referer=&signature=vdJezHvxlnLvIdmC2qvxJSTMiyw%3D)

생성한 머신 선택 → **Edit virtual machine settings** → Hard Disk 선택 → Remove 클릭

## 7단계: 새 하드 디스크 추가

Add → Hard Disk → Next

![SCSI 선택](https://blog.kakaocdn.net/dna/bOJapo/dJMcaiILuUM/AAAAAAAAAAAAAAAAAAAAAP3LOjeFhbKf2ewOVhcq9MVH6nxJrxItCYzm2AE5l8ai/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1780239599&allow_ip=&allow_referer=&signature=G0kc1HWy9s%2F5Kw3F5nPhNcvWQ1g%3D)

SCSI 선택 유지 → Next

## 8단계: 기존 디스크 이미지 지정

![디스크 선택](https://blog.kakaocdn.net/dna/c8spBC/dJMcaiWiQKW/AAAAAAAAAAAAAAAAAAAAAPbWCp2TkrIuFjRLulNuFHXVeTaWYEgbYuobKOTdsYq-/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1780239599&allow_ip=&allow_referer=&signature=Pxsx9OlxKCZm4JYuZrVIUC%2Fr9jM%3D)

**Use an existing disk** 옵션 선택 → Next

![파일 경로 선택](https://blog.kakaocdn.net/dna/J5LCW/dJMcafSRkCU/AAAAAAAAAAAAAAAAAAAAAA_qpG1I6TMatEYUI7Q_3GqSvRtvYadmRO0YWdYv0WYi/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1780239599&allow_ip=&allow_referer=&signature=%2F2vlNBWPhvSZBskLtFaIQNh2bmA%3D)

다운로드된 IoTGoat 파일 위치 지정 → 열기 → Finish

![설정 완료](https://blog.kakaocdn.net/dna/JEIod/dJMcacIBcwV/AAAAAAAAAAAAAAAAAAAAALJ6Z8OlaPbTFrr-ivYdjKla9qA2dK-LFcMCb7ocG6gJ/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1780239599&allow_ip=&allow_referer=&signature=26cWXUDhYpS%2BOEyt8eDJWM8RLJQ%3D)

## 9단계: 가상 머신 시작

![머신 목록](https://blog.kakaocdn.net/dna/MT6jD/dJMcafFjCzZ/AAAAAAAAAAAAAAAAAAAAANkrqWOAzCbzrywqOKwg0oGG0buS6rV3adomd9_C4q4p/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1780239599&allow_ip=&allow_referer=&signature=kxibgjKbckMtMcQ9CVEkF06ksvc%3D)

생성한 IoTGoat 머신 더블클릭 → 시작

## 10단계: 부팅 확인

![부팅화면1](https://blog.kakaocdn.net/dna/b5XBxc/dJMcabiCn0y/AAAAAAAAAAAAAAAAAAAAAEUOpX7zoJzl9CNPlXxWWvVR1RoQsqd96-GYHsc2fTmb/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1780239599&allow_ip=&allow_referer=&signature=OgIKBFVNiaxYKI%2BVxNK2VmaZCG0%3D)

![부팅화면2](https://blog.kakaocdn.net/dna/VHSZ5/dJMcacIBcAF/AAAAAAAAAAAAAAAAAAAAADIhz0F45klMMPeD7ZM4VfM43rzyLa-D3tOswfGeXnQT/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1780239599&allow_ip=&allow_referer=&signature=ZfnXcNmHKq8XZewgjpt5o%3D)

![최종 완료](https://blog.kakaocdn.net/dna/dfKqSv/dJMcacV647h/AAAAAAAAAAAAAAAAAAAAAJGffJS1pfhwfyz0A55gWSuX360mYCebTELVkM5cDcNH/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1780239599&allow_ip=&allow_referer=&signature=IP5ZiZSD4kRE%2FMEFHIxezrZf8Lg%3D)

설치 완료!

> 마우스 해제: Ctrl + Alt 조합`
  },
  {
    id: 45, slug: '45', title: 'CNN 기초 이해하기!', tag: 'Python', created_at: '2025-11-23',
    content: `CNN이란 무엇인가를 본격적으로 이해하기 전에, 우선 도입부를 이해해보자.

컴퓨터의 세상은 0과 1로 이루어진다. 여기서 0과 1은 처음부터 컴퓨터 언어였던 것이 아니다. 이는 인간이 만든 규칙이었을 뿐인데 컴퓨터가 쓰는 방식인 High, Low는 번잡스러울 것 같아 0, 1로 대체한 것이다.

그렇다면 컴퓨터 안의 데이터는 무엇을 의미하는 것일까.

데이터는 바로 **숫자**를 의미한다. 컴퓨터는 단순 기계이기에 우리가 가르쳐주지 않는 한 글자, 사진 등을 그대로 이해하지 못한다.

## 이미지는 무엇으로 구성되었을까?

흔히들 이미지는 그림으로 구성되었을 거라 생각한다. 그러나 이는 틀렸다.

이미지 또한 **숫자**로 이루어진 것이다. 이미지는 수많은 '픽셀'로 이루어진 점의 모습으로, 여기서 픽셀은 색깔을 숫자로 표현한 것을 말한다. 실제로 이미지를 확대하면 작은 네모들이 수백만 개가 모인 것을 볼 수 있다.

![뉴진스 단체 사진](https://blog.kakaocdn.net/dna/oALmm/dJMcafrtPNo/AAAAAAAAAAAAAAAAAAAAADk_hhaGE5mFFsqZ-LAxigxNyrqEPZjhp6VkODbr12K2/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1780239599&allow_ip=&allow_referer=&signature=sP0BIXvMEYkIAXSUUg3Cbf3TZfM%3D)

본 사진을 보면 전체적으로 매끄러움을 느낄 수 있다. 이제 확대해보면:

![픽셀 확대 이미지](https://blog.kakaocdn.net/dna/v506p/dJMcag4ZJ6G/AAAAAAAAAAAAAAAAAAAAAFdkBrXUOwhXDcOFmo0wSzfH6B-hXBAng3D3M1LOEWSl/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1780239599&allow_ip=&allow_referer=&signature=zxWmfuqDZ1kPL8LOm1xS6G5bdAY%3D)

작은 알갱이들이 보이는가! 저것이 바로 픽셀이다. 픽셀은 확대하면 보이는 색깔 네모 한 칸이다.

> 초창기 컴퓨터 그래픽 개발자들이 '정사각형 배열' 기준을 만들었기 때문에 암묵적인 룰이 되었다.

## CNN이란?

CNN은 딥러닝으로 이미지를 보고 알아서 **유용한 특징을 자동 추출**하는 것이다. 이런 픽셀 기반의 내용들이 기반이 되어야 완전히 이해할 수 있다.

Tags: CNN, python`
  },
  {
    id: 44, slug: '44', title: '우분투/리눅스에서 한글 쓰는 법', tag: 'Unix', created_at: '2025-11-19',
    content: `우분투에서 한글 입력이 안 될 때 해결 방법입니다.

## 문제 원인

기본 세션이 Wayland로 실행되어 ibus-hangul이 정상적으로 동작하지 않는 문제입니다.

## 해결 과정

- 기본 세션이 Wayland로 실행되어 ibus-hangul이 정상적으로 동작하지 않는 문제 확인
- 로그인 화면에서 **Ubuntu on Xorg** 로 변경 후 재로그인
- 입력 소스에 Korean(Hangul) 추가 및 ibus 설정 확인
- /etc/default/keyboard 파일에서 XKBLAYOUT="kr,us" 로 수정
- ibus restart, setxkbmap -query 등을 통해 적용 여부 확인
- 현재 GUI 전체에서 한글 입력이 정상적으로 작동

Tags: 리눅스, 우분투, 한글변환`
  },
  {
    id: 43, slug: '43', title: '변수와 연산자', tag: 'C언어', created_at: '2025-11-15',
    content: `## 변수란?

변수란, 값을 저장할 수 있는 메모리 공간에 붙여진 이름을 말한다. 즉, 컴퓨터 안에 만들어진 '작은 상자'에 내가 원하는 값을 넣어두고, 그 상자를 부를 때 사용할 이름을 정하는 것이다.

코딩으로 나타내면 다음과 같다.

> #include <stdio.h>
> int main(){
>     int num = 20;
>     printf("%d", num);
>     return 0;
> }

\`int num = 20;\` 이라는 것으로, 숫자 20을 num이라고 지어준 변수에 넣는다는 것을 의미한다.

원래는 아래와 같이 선언과 할당을 분리해야 한다.

> int main(void){
>     int num;
>     num = 20;
>     printf("%d", num);
>     return 0;
> }

## 연산자

C 언어에서 기본 연산자는 다음과 같다.

- \`+\` (더하기)
- \`-\` (빼기)
- \`*\` (곱하기)
- \`/\` (나누기)
- \`%\` (나머지)

이 다섯 가지 연산자만 알아도, 변수들을 이용한 간단한 계산식은 충분히 만들 수 있다.

예: a + b, a * b, (a + b) * c

처음부터 전부 외우려고 하지 말고, 기본 연산자에 익숙해진 뒤 하나씩 확장해 나가는 걸 추천한다.

![변수와 연산자 예시](https://blog.kakaocdn.net/dna/bIo4ES/dJMcagw6dSm/AAAAAAAAAAAAAAAAAAAAAA_UXiF1EtsfJ1D-efUzT8xhdQs6_GgR4WD7s9ILzKuP/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1780239599&allow_ip=&allow_referer=&signature=XhGohW0heD%2BZ%2F0oRUBR7HgQvXAg%3D)`
  },
  {
    id: 42, slug: '42', title: 'c언어의 매우 기초 부분 (printf)', tag: 'C언어', created_at: '2025-11-14',
    content: `## #include <stdio.h>

필수 기본 헤더 파일이다. C에서는 printf, scanf 같은 기능이 stdio.h 안에 들어 있기 때문에 규칙처럼 항상 넣는다.

## 주요 키워드 설명

- **int** — 정수형 자료형
- **main** — 프로그램이 실행될 때 맨 처음 불리는 함수 이름
- **( )** — 함수의 입력(매개변수)이 들어가는 자리
- **{ }** — 함수가 실제로 실행되는 코드 영역
- **return 0;** — 프로그램을 정상적으로 종료한다는 의미

## 핵심 포인트

C 언어를 처음 시작할 때는 \`#include <stdio.h>\`부터 \`int main() { }\`까지가 거의 기본 틀이다.

화면에 글자를 출력하고 싶을 때는 printf를 써야 한다. (printf = "print formatted"의 줄임말)

## 예시 코드

> #include <stdio.h>
> int main() {
>     printf("------------------------------------------\\n");
>     printf("\\n");
>     printf("        디 지 털 포 렌 식 연 습           \\n");
>     printf("\\n");
>     printf("------------------------------------------\\n");
>     return 0;
> }

![출력 결과](https://blog.kakaocdn.net/dna/7RgAW/dJMcaaDEiWu/AAAAAAAAAAAAAAAAAAAAAO-ylpPz0bK8Wom949EIIu8nzG9YPrjcb6FLfamcJkRv/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1780239599&allow_ip=&allow_referer=&signature=HmapxzRKrhswZBP%2BW3y3Uw0VxY0%3D)`
  },
  {
    id: 41, slug: '41', title: '프로그램의 기본 구성', tag: 'C언어', created_at: '2025-11-07',
    content: `## 함수(Function)란?

함수 = **input(입력) + output(출력) + function(기능)**

## 기본 프로그램 구조

> #include <stdio.h>
>
> int main(void){
>     printf("Hello world \\n");
>     return 0;
> }

## 주요 요소 설명

- **int** — 출력 형태 (정수)
- **main** — 함수 이름
- **void** — 입력 형태 (없음)
- **세미콜론(;)** — 문장의 끝 표시
- **return 0;** — 현재 실행 중인 함수의 종료
- **주석** — 코드에 대한 설명을 달 수 있는 메모장 역할
- **\\n** — 줄을 바꾸는 이스케이프 시퀀스 (Enter 개념)`
  },
  {
    id: 40, slug: '40', title: 'c언어 프롤로그', tag: 'C언어', created_at: '2025-11-06',
    content: `C언어는 **모든 프로그래밍 언어의 기초**가 되는 언어입니다.

## C언어의 3요소

- **프로그래밍 언어** — 사람과 컴파일러 간의 통신을 가능하게 하는 표준화된 형태
- **컴파일러** — 인간의 명령어를 기계가 읽을 수 있는 형태로 변환하는 번역기
- **기계 언어** — 컴퓨터가 실제로 실행하는 이진 코드(0과 1)

## 프로그램 개발 순환

> 코드 작성 → 컴파일 → 에러 감지 → 코드 수정 → 재컴파일

> "에러가 발생하지 않을 때까지 '에러 발생 > 프로그램 수정 > 컴파일' 과정을 무한 반복해야 한다."

> Visual Studio 설치 방법은 온라인에서 쉽게 찾을 수 있으므로 생략합니다.`
  },
  {
    id: 39, slug: '39', title: 'vi editor', tag: 'Unix', created_at: '2025-10-27',
    content: `vi는 Bill Joy가 UC Berkeley에서 개발한 Unix 기본 텍스트 에디터입니다.

## 실행 방법

> $ vi [filename]
> $ vi +줄번호 filename
> $ vi +/검색어 filename
> $ vi -R filename  (읽기 전용)
> $ view filename   (읽기 전용)

## 모드 전환

- **명령 모드 → 삽입 모드**: i, a, o, O 키
- **삽입 모드 → 명령 모드**: ESC 키

## 커서 이동

- h: 왼쪽 / j: 아래 / k: 위 / l: 오른쪽
- w: 다음 단어 / b: 이전 단어
- 방향키도 사용 가능

## 저장 및 종료

- :wq — 저장 후 종료
- :x — 저장 후 종료 (변경 있을 때만)
- :q! — 저장 없이 강제 종료
- :w filename — 다른 이름으로 저장

## 설정

- :set nu — 줄 번호 표시
- :set ts=n — 탭 크기 설정

> vi는 마우스를 지원하지 않고 명령/삽입 이중 모드로 처음엔 어렵지만 강력한 도구입니다.`
  },
  {
    id: 38, slug: '38', title: '사용자 관리 명령어 — 프로세스', tag: 'Unix', created_at: '2025-10-27',
    content: `## 프로세스(Process)란?

> "프로세스는 컴퓨터가 지금 실행중인 작업을 의미한다."

UNIX 시스템은 커널 스케줄링을 통해 멀티태스킹을 지원합니다. 각 프로세스는 고유한 PID(Process ID)를 가집니다. 프로세스 종료 권한은 root 또는 프로세스 소유자로 제한됩니다.

## ps 명령어

현재 실행 중인 프로세스 정보를 표시합니다.

> $ ps [ -option ]
> $ pstree

## 주요 옵션

- \`-u\` — 사용자 이름과 프로세스 시작 시간 표시
- \`-l\` — 상세 정보 표시

## pstree

프로세스 계층 구조를 트리 형태로 보여줍니다.`
  },
  {
    id: 37, slug: '37', title: '사용자 통신 명령어', tag: 'Unix', created_at: '2025-10-27',
    content: `Unix에서 사용자 간 통신을 위한 명령어들입니다.

## 1. 로그인한 사용자 확인

- users — 현재 접속 중인 사용자 목록
- who — 사용자 정보 상세 표시 (가장 일반적)
- w — 사용자 활동 정보 표시
- finger — 사용자 상세 정보 (별도 설치 필요)

## 2. 사용자 공개 정보 변경 (chfn)

> $ chfn [-f 성명] [-o 사무실] [-p 전화] [-h 집전화] [사용자명]

## 3. Talk 명령어

> $ talk [user_id][terminal_name]

양쪽 모두 명령어를 실행해야 2방향 대화가 성립됩니다.

## 4. Write 명령어

> $ write [사용자명]

특정 사용자에게 메시지 전송. Ctrl+D로 종료합니다.

## 5. 메시지 수신 제어 (mesg)

> $ mesg y   — 메시지 수신 허용
> $ mesg n   — 메시지 수신 거부

## 6. Wall 명령어

> $ wall

시스템 전체 사용자에게 메시지 전송. 관리자 사용 권장. Ctrl+D로 종료합니다.`
  },
  {
    id: 36, slug: '36', title: '사용자 관리 명령어', tag: 'Unix', created_at: '2025-10-26',
    content: `Linux/Unix에서 사용자 계정 및 그룹을 관리하는 명령어들입니다.

## useradd — 사용자 계정 생성

> $ useradd [옵션] 사용자명

- \`-d\` — 홈 디렉터리 지정
- \`-m\` — 홈 디렉터리 생성
- \`-g\` — 그룹 지정
- \`-u\` — UID 지정
- \`-e\` — 만료 날짜 지정

사용자 정보는 /etc/passwd 및 /etc/shadow에 저장됩니다.

## adduser

useradd와 동일 기능이나 **대화형 방식**으로 더 편리합니다.

## passwd — 패스워드 설정

> $ passwd [사용자명]

현재 비밀번호 입력 후 새 비밀번호를 설정합니다. root는 다른 계정 비밀번호도 변경 가능합니다.

## usermod — 계정 수정

> $ usermod [옵션] 사용자명

useradd와 유사한 옵션을 사용합니다. 기존 계정 설정을 수정합니다.

## userdel — 계정 삭제

> $ userdel [-r] 사용자명

\`-r\` 옵션: 홈 디렉터리도 함께 삭제합니다.

## groupadd — 그룹 생성

> $ groupadd [-g GID] 그룹명

## groupdel — 그룹 삭제

> $ groupdel 그룹명`
  },
  {
    id: 35, slug: '35', title: '쉘(Shell)', tag: 'Unix', created_at: '2025-10-26',
    content: `## 쉘(Shell)이란?

> 쉘은 "명령어 해석기로, 커널에 사용자의 명령을 전달하는 인터페이스이자 프로그램"입니다.

## 주요 쉘 4종류

- **Bourne Shell (sh)** — 1979년 Stephen Bourne 개발. UNIX 첫 표준 쉘. 프롬프트: $
- **C Shell (csh)** — Bill Joy 개발. C 언어 구문 기반. 프롬프트: %. 히스토리 기능 포함
- **Korn Shell (ksh)** — David Korn 개발. Bourne 쉘을 C 쉘 기능으로 확장. 프롬프트: %
- **Bash (bash)** — GNU 프로젝트. "Bourne Again Shell". Linux 표준 쉘. 프롬프트: $

## 쉘의 3가지 주요 기능

- **명령 처리** — 입력 읽기, 파싱, 프로그램 실행
- **입출력 리다이렉션** — 표준 입출력을 파일로 리다이렉트
- **파이프** — 한 명령어의 출력을 다른 명령어의 입력으로 연결

## 로그인 프로세스

/etc/passwd 확인 → /etc/shadow 암호 검증 → 환경 설정 구성 → 쉘 실행

## /etc/passwd 파일 구조

> 사용자명:패스워드:UID:GID:주석:홈디렉터리:쉘

## /etc/shadow 파일

암호화된 패스워드 파일 (root 전용 접근). 비밀번호 에이징 정보 포함.`
  },
  {
    id: 34, slug: '34', title: '파일 응용 명령어', tag: 'Unix', created_at: '2025-10-26',
    content: `## wc (Word Count)

지정한 파일의 라인 수, 단어 수, 문자 수를 카운트합니다.

> $ wc [-c|-m|-l|-w] 파일명

- \`-c\` — 바이트 수 / \`-m\` — 문자 수 / \`-l\` — 라인 수 / \`-w\` — 단어 수

## cut

파일에서 특정 부분을 추출합니다.

> $ cut [-c|-f|-d] 파일명

## paste

여러 파일의 데이터를 병합합니다.

## tr (Translate)

문자를 치환하거나 삭제합니다.

- \`-d\` — 문자 삭제 / \`-s\` — 반복 문자 압축

## sort

내용을 정렬합니다.

- \`-n\` — 숫자 정렬 / \`-r\` — 역순 / \`-u\` — 중복 제거 / \`-k\` — 키 필드

## split

파일을 더 작은 조각으로 나눕니다.

## uniq

인접한 중복 라인을 처리합니다.

## cmp / comm / diff

파일 비교 도구:
- cmp — 바이트 단위 비교
- comm — 공유/고유 라인 식별
- diff — 자세한 차이점 표시

## grep

파일 내에서 패턴이나 문자열을 검색합니다.

> $ grep [옵션] 패턴 파일명

- \`-i\` — 대소문자 미구분 / \`-n\` — 라인 번호 / \`-v\` — 패턴 미포함 줄

## find

시스템 전체에서 파일을 검색합니다.

> $ find 경로 [-name|-type|-size|-exec]`
  },
  {
    id: 33, slug: '33', title: '파일 관리 명령어', tag: 'Unix', created_at: '2025-10-26',
    content: `## mv (Move) — 이동/이름 변경

> $ mv [-i] 원본 대상

원본을 대상으로 이동하거나 이름을 변경합니다. \`-i\` 옵션: 덮어쓰기 전 확인.

## cp (Copy) — 복사

> $ cp [-ir] 원본 대상

원본을 보존하면서 복사본을 생성합니다. \`-r\` 옵션: 디렉터리 복사.

## rm (Remove) — 삭제

> $ rm [-fir] 파일명

복구 옵션 없이 파일을 영구 삭제합니다. \`-f\` 강제 / \`-r\` 재귀 삭제.

## alias — 단축어

> $ alias 단축어='명령어'

자주 사용하는 명령어에 단축키를 만듭니다. (세션 전용)

## ln (Link) — 링크

> $ ln [-s] 원본 대상

\`-s\` 옵션: 심볼릭 링크 생성.

## chmod — 접근 권한 변경

> $ chmod [권한] 파일명

8진 표기법(0-7) 또는 기호 연산자(rwx) 사용.

## chown / chgrp — 소유권 변경

파일 소유자와 그룹을 변경합니다. (root 전용)

## touch — 타임스탬프/빈 파일 생성

> $ touch 파일명

## umask — 기본 권한 설정

새 파일(기본 666) 및 디렉터리(기본 777)의 기본 권한을 정의합니다.

## cat / more / head / tail — 파일 내용 표시

- head: 앞부분 / tail: 뒷부분 / more: 한 화면씩
- \`tail -f\`: 실시간 업데이트 표시`
  },
  {
    id: 32, slug: '32', title: '디렉터리 관리 명령어 mkdir, rmdir', tag: 'Unix', created_at: '2025-10-26',
    content: `## mkdir — 디렉터리 생성

Make directory의 약자. 생성 시 현재 디렉터리(.)와 상위 디렉터리(..)가 자동 생성됩니다.

> $ mkdir [-m mode] [-p] directory_name

## 주요 옵션

- **-m** — 새 디렉터리의 접근 권한을 명시적으로 선언
- **-p** — 계층적 구조를 갖는 디렉터리를 한꺼번에 생성 (하위 디렉터리까지 한 번에)

> -m 옵션은 디렉터리 생성 시 자동으로 지정되는 기본 접근권한을 사용자가 임의로 지정할 수 있습니다.

## rmdir — 디렉터리 삭제

Remove directory의 약자. **빈 디렉터리만** 삭제 가능합니다.

> $ rmdir [-p] directory_name

## 주요 옵션

- **-p** — 계층적 구조를 갖는 디렉터리를 한꺼번에 삭제`
  },
  {
    id: 31, slug: '31', title: '디렉터리 관리 명령어 ls', tag: 'Unix', created_at: '2025-10-26',
    content: `ls는 디렉터리 내용을 나열하는 명령어입니다. (DOS의 dir 명령어와 동등)

## 기본 구문

> $ ls [-aliFR] [파일명 | 디렉터리명]

## 주요 옵션

- **-a** — 숨겨진 점 파일을 포함한 모든 파일 표시
- **-i** — i-node 번호 표시
- **-l** — 상세 정보가 포함된 목록 형식
- **-F** — 파일 타입 표시 (/ 디렉터리, * 실행파일, @ 심볼릭 링크)
- **-R** — 재귀적으로 하위 디렉터리 내용 표시

## 사용 예시

> $ ls -al    (상세 정보가 있는 모든 파일)
> $ ls -R .   (현재 디렉터리 및 모든 하위 디렉터리)

## ls -l 출력 정보

파일타입, 접근권한, 하드링크수, 소유자, 그룹, 파일크기, 수정날짜/시간, 파일명

## 파일 타입 표시기

- d — 디렉터리
- - — 정규 파일
- l — 심볼릭 링크
- b — 블록 디바이스
- c — 문자 디바이스
- p — 이름이 지정된 파이프
- s — 소켓`
  },
  {
    id: 30, slug: '30', title: '와일드카드 (*, 에스터리스크)', tag: 'Unix', created_at: '2025-10-26',
    content: `파일명의 일부만 알거나, 여러 파일을 한꺼번에 지정할 때 사용하는 특수 문자입니다.

## 와일드카드 종류

- **\*** — 길이에 관계없이 0개 이상의 연속 문자와 일치
- **?** — 정확히 1개의 문자와 일치 (수량이 중요)
- **[ ]** — 문자 범위를 나타냄. 예: c[2-4].txt → c2.txt, c3.txt, c4.txt
- **{ }** — 쉼표로 여러 패턴을 분리. 예: {*.txt,*.jpg}

## 사용 예시

> $ ls c*.txt         (c로 시작하는 모든 txt 파일)
> $ ls c?.txt         (c 다음에 1글자가 오는 txt 파일)
> $ ls c[2-4].txt     (c2, c3, c4.txt)

> 와일드카드는 단일 명령어를 통해 특정 패턴의 수많은 파일을 지정할 때 매우 유용합니다.`
  },
  {
    id: 29, slug: '29', title: '파일 시스템', tag: 'Unix', created_at: '2025-10-26',
    content: `## 파일 시스템이란?

> "파일 시스템은 운영 체제가 파티션 또는 디스크에 파일을 저장하는 방식과 데이터 구조"입니다.

## Unix 파일 저장 과정

- 파일 데이터에 대한 디스크 공간 할당
- i-node 구조 생성 (메타데이터 포함)
- 실제 데이터 블록에 내용 저장

## i-node

파일의 신분증 역할. 파일명이 아닌 실제 데이터 위치와 속성 정보를 담습니다.

포함 정보: 소유자, 접근 권한, 데이터 블록 주소, 파일 크기, 타임스탬프, 링크 수, 파일 타입

## Linux 표준 디렉터리

- / — 루트 디렉터리
- /bin — 기본 실행 파일
- /home — 사용자 홈 디렉터리
- /etc — 시스템 설정 파일
- /usr — 응용 프로그램

## 디렉터리 이동 (cd)

> $ cd /절대경로
> $ cd 상대경로
> $ cd .   (현재 디렉터리)
> $ cd ..  (상위 디렉터리)

## 파일 유형

정규 파일, 디렉터리, 특수 파일, 소켓, 이름이 지정된 파이프, 심볼릭 링크, 하드 링크`
  },
  {
    id: 28, slug: '28', title: '명령어 일반형식과 매뉴얼', tag: 'Unix', created_at: '2025-10-26',
    content: `## 명령어 인수

**옵션**: \`-\` 접두사로 명령의 동작 방식을 변경합니다. 여러 옵션을 그룹화할 수 있습니다.

**매개변수**: 명령이 처리하는 값 또는 대상입니다.

## 전경 vs 배경 처리

- **포그라운드**: 사용자가 직접 관찰/제어. 완료까지 대기
- **배경 처리**: 명령어 끝에 **&** 기호 추가. 동시에 다른 작업 가능

> $ 명령어 &

## man 명령어 (매뉴얼)

> $ man [명령어]

## man 페이지 구성

- **Name** — 명령어 이름과 간략한 설명
- **Synopsis** — 사용 형식
- **Description** — 상세 설명
- **Files** — 관련 파일
- **See Also** — 관련 명령어
- **Diagnostics** — 진단 메시지
- **Bugs** — 알려진 버그

## 네비게이션

- spacebar — 다음 페이지
- Enter — 한 줄씩
- Q — 종료

## 빠른 참조

> $ whatis 명령어     (한 줄 요약)
> $ man -f 명령어    (한 줄 요약)
> $ apropos 부분     (관련 명령어 검색)
> $ man -k 부분      (관련 명령어 검색)
> $ clear            (화면 지우기)`
  },
  {
    id: 27, slug: '27', title: '리눅스', tag: 'Unix', created_at: '2025-10-26',
    content: `## 쉘 프로그램

쉘 프로그램은 **사용자-시스템 통신을 가능하게 하는 명령 프로세서** 역할을 합니다.

## 사용자 유형

- **시스템 관리자 (root)** — 전체 제어 권한
- **일반 사용자** — 제한된 권한

## 권한 전환

> $ su root           (일반 사용자 → root)
> $ su 사용자계정     (root → 일반 사용자)
> $ sudo passwd root  (root 패스워드 설정)

## 원격 접속 (SSH)

Telnet보다 SSH가 보안상 안전합니다.

> $ apt-get install openssh-server   (SSH 서버 설치)
> $ service ssh restart               (SSH 서비스 재시작)
> $ ifconfig                          (IP 확인)
> $ ip a                              (IP 확인)

## 기본 조작

- 패스워드 변경: passwd
- 로그아웃: exit 또는 logout
- Linux는 **대소문자를 구분**합니다.

## 특수 키

- Ctrl+C — 현재 명령 중단
- Ctrl+H — 한 글자 지우기
- Ctrl+U — 현재 줄 전체 지우기
- Ctrl+D — EOF (파일 끝 신호)`
  },
  {
    id: 26, slug: '26', title: '운영체제', tag: 'Unix', created_at: '2025-10-26',
    content: `## 운영체제(Operating System)란?

> 운영체제는 컴퓨터 사용자와 하드웨어 사이의 인터페이스로 작동하며 제한된 시스템 리소스를 효율적으로 관리하는 시스템 프로그램입니다.

즉, **인간이 하드웨어를 효율적으로 사용할 수 있게 해주는 시스템 소프트웨어의 집합**입니다.

## 하드웨어 vs 소프트웨어

- **하드웨어**: CPU, Memory(RAM, ROM), Hard Disk, I/O(마우스, 키보드)
- **소프트웨어**: 시스템 SW, 응용 SW

## 운영체제의 4가지 주요 기능

- 메모리 사용 제어
- 파일 시스템 관리
- 작업 스케줄링
- 계정 관리

## 시스템 자원 분류

**물리적 자원**: CPU, 메모리, HDD, 터미널, 네트워크

**추상적 자원**: 작업(Task), 세그먼트/페이지, 파일시스템, 프로토콜

## 파일시스템 할당 기법

- **연속 할당** — 인접한 블록에 순차 저장
- **연결 할당** — 연결 리스트로 효율적 공간 활용
- **색인 할당** — 별도 인덱스 파일에 데이터 위치 저장

## i-node 정보

64KB 크기. 소유자 ID, 접근 모드, 블록 주소, 파일 크기, 타임스탬프, 링크 수, 파일 타입 포함.`
  },
  {
    id: 25, slug: '25', title: '소프트웨어', tag: 'Unix', created_at: '2025-10-26',
    content: `## 소프트웨어(Software)란?

> 인간이 컴퓨터 하드웨어를 운용하기 위해 필요한 일련의 명령어 집합입니다.

## 소프트웨어의 2가지 종류

### 시스템 소프트웨어 (System SW)
하드웨어와 응용 소프트웨어의 상호 작용을 가능하게 합니다.

CPU, 기억장치, 입출력장치 등을 사용자가 편리하게 사용하도록 **인터페이스**를 제공합니다.

> 인터페이스: 프로그램 사이 혹은 사람과 컴퓨터 간의 연결점

예시: 운영체제(OS), 컴파일러, 드라이버

### 응용 소프트웨어 (Application SW)
특정 업무를 위한 프로그램 또는 애플리케이션입니다.

예시: 워드프로세서, 게임, 웹 브라우저`
  },
  {
    id: 24, slug: '24', title: 'Alias', tag: 'Database', created_at: '2025-10-26',
    content: `## Alias(별명)란?

Alias는 **쿼리 실행 중에만 존재하는 테이블 또는 열에 할당된 임시 이름**입니다.
데이터베이스의 실제 구조를 수정하지 않습니다.

## 핵심 특성

- 임시 성질: 쿼리 실행 중에만 존재
- 비파괴성: 원본 데이터베이스 객체 이름 보존
- 가독성 개선: 복잡한 표현식 단순화
- 결과 제어: SELECT 문에 표시되는 열 이름 관리

## 사용 예시

> SELECT first_name AS 이름, salary AS 급여
> FROM employees;

## 모범 사례

- 의미 있고 일관된 레이블로 명명 규칙 따르기
- 테이블 별명은 2-4자 권장
- AS 키워드를 명시적으로 사용
- Alias 이름에 공백 피하기

Tags: ALIAS, 별명`
  },
  {
    id: 23, slug: '23', title: 'SELECT ... FROM문', tag: 'Database', created_at: '2025-10-26',
    content: `## SQL 개요

SQL(Structured Query Language)은 **데이터베이스에서 사용되는 공통 언어**입니다. ANSI 표준을 따릅니다.

## SQL 명령어 분류

- **DDL** (데이터 정의어): CREATE, DROP, ALTER, TRUNCATE
- **DML** (데이터 조작어): INSERT, UPDATE, DELETE
- **TCL** (트랜잭션 제어어): COMMIT, ROLLBACK, SAVEPOINT
- **DQL** (데이터 쿼리어): SELECT
- **DCL** (데이터 제어어): GRANT, REVOKE

## MySQL SQL 처리 흐름

쿼리 캐시 → 파서 → 전처리기 → 쿼리 최적화기 → 실행 엔진 → 스토리지 엔진 → 결과 전달

## SELECT ... FROM 문

특정 테이블에서 데이터를 열 단위로 검색합니다.

> SELECT 열이름
> FROM 테이블이름
> WHERE 조건

전체 열 조회:

> SELECT *
> FROM 테이블이름

## USE 문

사용할 데이터베이스를 선택합니다.

> USE 데이터베이스명;

> *(에스터리스크)는 "모든 것"을 의미하며 모든 열을 가져옵니다.`
  },
  {
    id: 22, slug: '22', title: '데이터베이스 for Beginner ch03 연습문제', tag: 'Database', created_at: '2025-10-26',
    content: `Database for Beginner 3장 연습문제 풀이입니다.

> 개인 학습 노트이며 완전히 정확하지 않을 수 있습니다.

## 주요 문제 해설

**Q1.** "데이터 모델링"은 데이터베이스 설계에서 건축 청사진과 유사한 용어입니다.

**Q2.** 모델링은 폭포수 모델의 **"비즈니스 분석"** 및 **"시스템 설계"** 단계와 관련됩니다.

**Q3.** "쇼핑몰 입장"은 의미 있는 데이터 지속성이 부족하므로 테이블 변환에 부적절합니다.

**Q4.** 모델링의 세 단계: **개념적, 논리적, 물리적**. "분석적 모델링"은 존재하지 않습니다.

**Q5.** 데이터를 여러 테이블로 분리하기 전에 중복 레코드를 제거해야 합니다.

**Q6.** 별도 테이블 간의 연결을 **"관계"**라고 합니다.

**Q7.** "기본 키"와 "외래 키"는 부모 테이블과 자식 테이블 간의 관계를 만듭니다.

**Q8.** 데이터베이스 다이어그램에 대한 5가지 설명 모두 정확해 보이므로 원래 질문에 잠재적 오류가 있을 수 있습니다.`
  },
  {
    id: 21, slug: '21', title: "DBA's Role", tag: 'Database', created_at: '2025-10-25',
    content: `## DBA(Database Administrator)란?

조직 데이터가 **안전하고, 빠르며, 지속적으로 사용 가능**하도록 보장하는 전문가입니다.

## 주요 역할

- 데이터베이스 설계
- 성능 최적화 (튜닝)
- 보안 관리
- 백업 및 복구
- 장애 대응
- 운영 자동화

## 직책의 변화

많은 조직에서 DBA 직책이 다른 명칭으로 대체되고 있습니다:

- **DBRE** (Database Reliability Engineer)
- **Data/Platform Engineer**
- **SRE** (Site Reliability Engineer)

> "The title may disappear, but the technical demand continues."
> 용어는 변경되지만 데이터베이스 전문 지식의 핵심 역량과 시장 수요는 지속됩니다.`
  },
  {
    id: 20, slug: '20', title: '요구 분석과 시스템 설계 그리고 모델링', tag: 'Database', created_at: '2025-10-25',
    content: `## 정보시스템 개발 5단계

분석 → 설계 → 구현 → 테스트 → 유지보수

- **분석 단계**: "무엇을(What)" 할 것인지 결정. 요구사항 수집, 사용자 인터뷰
- **설계 단계**: "어떻게(How)" 할 것인지 결정. 시스템/프로그램 설계

## 데이터베이스 11가지 필수 용어

- **데이터**: 테이블 내의 개별 정보
- **테이블**: 표 형식으로 구성된 데이터
- **데이터베이스**: 테이블 저장 위치
- **DBMS**: 데이터베이스를 관리하는 소프트웨어
- **열/필드**: 개별 테이블 열
- **열 이름**: 각 열의 고유 식별자
- **데이터 타입**: 열 데이터의 지정된 형식
- **행/레코드**: 실제 의미 있는 데이터 항목
- **SQL**: 인간과 DBMS 간의 통신 언어
- **기본 키 (PK)**: 각 행의 고유 식별자
- **외래 키 (FK)**: 두 테이블을 연결하는 키

## 프로젝트란?

정의된 제약 조건 내에서 **고유한 제품/서비스를 만드는 임시 노력**입니다. 명확한 시작/끝이 있습니다.

## 폭포수 모델

> 계획 → 분석 → 설계 → 구현 → 테스트 → 유지보수

각 단계가 완료되어야 다음 단계로 진행하는 순차적 방법론입니다.`
  },
  {
    id: 19, slug: '19', title: '파일시스템(FS) 장단점', tag: 'Database', created_at: '2025-10-25',
    content: `## 파일시스템(File System)이란?

> "저장 장치에서 파일을 저장하고 접근하기 위한 규칙 또는 프레임워크 집합"

## 핵심 특성

- 파일은 순차적인 레코드로 구성됩니다
- 파일 접근 방법이 애플리케이션 프로그램에 내장되어 있어 데이터 종속성이 생깁니다
- 기본 데이터 접근을 넘어서는 별도의 제어 메커니즘이 없습니다

## 파일시스템의 단점 10가지

- 데이터 불일치 문제
- 여러 사용자의 동시 접근 제어 부족
- 쿼리 언어 기능 부재
- 부적절한 보안 기능
- 복구 메커니즘 없음
- 빈약한 데이터 독립성으로 유지보수 비용 증가
- 불충분한 데이터 모델링 개념
- 데이터 무결성 유지 어려움
- 제한된 생산성
- 제한된 데이터 공유 기능

> 이러한 단점들을 해결하기 위해 DBMS가 등장했습니다.`
  },
  {
    id: 18, slug: '18', title: '데이터베이스 for Beginner ch02 연습문제', tag: 'Database', created_at: '2025-10-20',
    content: `Database for Beginner 2장 연습문제 풀이입니다.

> 개인 학습 자료이며 최종 답변이 아닐 수 있습니다. 어려운 문제는 ChatGPT를 참고했습니다.

## 다루어진 주요 주제

**데이터베이스 구축 과정**: 데이터베이스 생성 → 테이블 생성 → 데이터 입력 → 데이터 쿼리

**MySQL 기초**: 기본 포트 번호는 3306

**MySQL Workbench 기능**:
- Administration 탭 — 서버 관리
- Schemas 탭 — 데이터베이스 작업

**DDL 연산 구분**:
- DROP — 테이블 자체를 삭제
- DELETE — 테이블의 데이터(행)를 삭제

**저장 프로시저 구문**:

> DELIMITER //
> CREATE PROCEDURE 프로시저명()
> BEGIN
>   -- SQL 문
> END //
> DELIMITER ;

**트리거**: DML 이벤트 시 자동 실행. \`FOR EACH ROW\` 구문 사용.

**인덱스**: 책 인덱스와 유사. 데이터 검색 속도 향상. 명명 규칙은 필수 아님.`
  },
  {
    id: 17, slug: '17', title: 'DB 개체', tag: 'Database', created_at: '2025-10-20',
    content: `데이터베이스에서 사용되는 주요 개체(Object)들을 정리합니다.

## 스키마(Schema)

> "객체를 담는 상자(네임스페이스)"

문자셋/콜레이션 설정을 포함합니다.

## 테이블(Table)

실제 데이터를 저장하는 표. InnoDB 엔진 권장.

## 파티션(Partition)

대용량 테이블/인덱스를 논리적 조각으로 분할하여 성능을 향상시킵니다.

## 인덱스(Index)

검색을 가속화하는 자료구조. "책의 맨 뒤 색인"과 같은 개념. 데이터 양이 많을수록 효과적.

## 제약조건(Constraint)

데이터 무결성을 위한 규칙. 기본키, 외래키, 유니크, 체크 등.

## 뷰(VIEW)

> "실제 데이터 복사 없는 가상 테이블"

여러 테이블을 미리 조인 또는 가공해둔 개념.

## 스토어드 프로시저 / 함수

- **스토어드 프로시저**: 여러 SQL을 묶은 실행 단위
- **스토어드 함수**: 값을 반환하며 SELECT 내에서 호출 가능

## 트리거(Trigger)

> "행 단위 BEFORE/AFTER DML 시 자동 실행"되는 명령문

## 임시 테이블

세션 범위의 일시적 테이블. 세션 종료 시 자동 삭제.

## 사용자/권한/역할

접근 제어 및 권한 묶음 관리.

> MySQL에는 시퀀스, 동의어, 물리적 구체화 뷰가 기본 제공되지 않습니다.`
  },
  {
    id: 16, slug: '16', title: '데이터베이스 구축 절차', tag: 'Database', created_at: '2025-10-19',
    content: `## 데이터베이스 구축 절차

### 1단계: DBMS 설치

MySQL, PostgreSQL 등 원하는 DBMS를 설치합니다.

### 2단계: 데이터베이스 구축 프로세스

> 데이터베이스 생성 → 테이블 생성 → 데이터 입력 → 데이터 조회 및 활용

### 3단계: 이후 경로

**경로 A: 데이터베이스 심화 활용**
- 테이블 외 다양한 데이터베이스 개체 활용
- 데이터 백업 및 관리

**경로 B: 응용 프로그램 적용**
- 구축된 데이터를 웹 서비스/애플리케이션에 활용
- 백엔드 개발과 연동`
  },
  {
    id: 15, slug: '15', title: '데이터베이스 모델링', tag: 'Database', created_at: '2025-10-19',
    content: `## 정보시스템 구축 절차

분석 → 설계 → 구현 → 테스트 → 유지보수

- **분석**: "무엇을(What)" 할 것인지 결정
- **설계**: "어떻게(How)" 할 것인지 결정

## 데이터베이스 모델링이란?

현실의 데이터를 데이터베이스에 어떻게 옮길지 결정하는 과정입니다.

예: "고객이 제품을 구매한다" → 고객 테이블 + 제품 테이블 + 구매 테이블

## 기본 용어

- **데이터**: 테이블에 담긴 단편적 정보
- **테이블**: 데이터를 담는 표 형태
- **기본키(PK)**: 각 행을 구분하는 유일한 열
- **외래키(FK)**: 두 테이블 관계를 맺어주는 키
- **SQL**: 사람과 DBMS 소통을 위한 언어

## 데이터 모델링 3단계

- **개념적 모델링** — 업무 분석 기반의 추상적 구조
- **논리적 모델링** — 데이터의 논리적 구조 설계
- **물리적 모델링** — 실제 DBMS에 구현하기 위한 설계`
  },
  {
    id: 14, slug: '14', title: '데이터베이스 for Beginner ch01 연습문제', tag: 'Database', created_at: '2025-10-17',
    content: `Database for Beginner 1장 연습문제 풀이입니다.

> 개인 학습 노트이며 공식 답변이 아닐 수 있습니다.

## 주요 문제 해설

**Q1.** 5개 옵션 중 "정답 없음"으로 결론. 잠재적 질문 오류 가능성.

**Q2.** 오픈소스가 아닌 데이터베이스:
**Oracle, SQL Server, Access** — 모두 상용 RDBMS 제품.

**Q3.** 적용되지 않는 DBMS 특성:
**2번** — 데이터베이스는 애플리케이션으로부터 독립성을 유지함. 저장 위치 변경은 애플리케이션 수정이 필요하지 않습니다.

**Q4.** 비DBMS 유형:
**4번** — "hierarchical-relational"은 실제 DBMS 카테고리가 아닙니다.

**Q5.** 적용되지 않는 SQL 특성:
**3, 4번** — SQL 구문은 공급업체에 따라 다르며, 분산 클라이언트/서버 구조를 지원합니다.

**Q6-7.** MySQL 8.4는 Windows 7에서 실행 불가. MySQL Workbench는 기본 설치 패키지에 포함되지 않음.

**Q8.** Employees 데이터베이스는 MySQL Server에 번들로 포함되지 않아 별도 다운로드가 필요합니다.`
  },
  {
    id: 13, slug: '13', title: 'SQL, MySQL 개요', tag: 'Database', created_at: '2025-10-16',
    content: `## SQL이란?

SQL(Structured Query Language)은 관계형 데이터베이스 관리 시스템(RDBMS)의 **데이터 관리를 위해 설계된 특수 목적 프로그래밍 언어**입니다.

## SQL의 6가지 특징

- DBMS 제작 회사와 독립적
- 다른 시스템으로 이식성이 좋음
- 표준이 계속 발전됨
- 대화식 언어 (즉시 질의 결과 획득)
- 분산형 클라이언트/서버 구조
- 구현에 내재적 변동성 존재 (회사마다 방언)

## MySQL이란?

Oracle사에서 제공하는 **오픈소스 RDBMS 소프트웨어**입니다.

- GPL(General Public License) 하에 라이선스
- 최신 GA버전: 8.4.6
- 소스코드 수정 및 배포 가능
- 개발 시작: 1994년

## MySQL 에디션

**상용판**: Standard < Enterprise < Cluster CGE (비용/기능 증가)

**Community Edition**: 비상업적 및 교육 목적에 적합. 거의 Enterprise와 동일한 기능.`
  },
  {
    id: 12, slug: '12', title: 'DB & DBMS 특징', tag: 'Database', created_at: '2025-10-16',
    content: `DB와 DBMS의 공통된 5가지 특징입니다.

## 1. 데이터의 무결성 (Integrity)

"제약 조건" — 데이터베이스 안의 데이터에 오류가 없어야 함을 말합니다. 결함이 없고 본래 상태를 유지해야 합니다.

## 2. 데이터의 독립성 (Independence)

ANSI-SPARC Architecture에 기반합니다. 데이터베이스 크기 및 파일 저장소 변경으로 기존 응용프로그램은 **전혀 영향을 받지 않아야** 합니다.

## 3. 데이터 중복 최소화 (Reduced Redundancy)

동일한 데이터가 여러 개 중복되어 저장되는 것을 방지합니다.

## 4. 응용프로그램 제작 및 수정 용이

통일된 방식으로 응용프로그램 작성이 가능하며, 유지보수 또한 쉬워집니다.

## 5. 데이터의 안전성 향상

대부분의 DBMS가 제공하는 **백업과 복원 기능**을 이용합니다.`
  },
  {
    id: 11, slug: '11', title: 'DBMS', tag: 'Database', created_at: '2025-10-16',
    content: `DBMS(Database Management System)는 **데이터베이스를 관리하고 운영하는 소프트웨어**입니다.

## DBMS의 역사적 유형

### 계층형 DBMS (Hierarchical)

1:N 관계를 가진 트리 구조. 가계도/족보와 같은 구조.

**장점**: 데이터 검색이 빠릅니다.
**단점**: 구조 변경이 매우 어렵습니다. 임의 검색에 취약합니다.

### 망형 DBMS (Network)

1:1, 1:N, N:M 관계를 모두 지원합니다. 사람들의 관계망처럼 복잡하게 연결됩니다.

복잡한 내부 포인터 사용으로 프로그래머가 전체 구조를 이해해야 합니다.

### 관계형 DBMS (Relational)

테이블(Table) 기반 구조. 엑셀의 표와 유사합니다.

**장점**: 업무 변화에 쉽게 적응. 유지보수 편리. 대용량 데이터 관리 및 무결성 보장.
**단점**: 시스템 자원을 많이 차지하여 전반적으로 느릴 수 있습니다.

## DBMS vs 파일 시스템 비교

| 구분 | DBMS | 파일 시스템 |
|------|------|------------|
| 데이터 종속성 | 독립성 보장 | 종속성 발생 |
| 데이터 중복성 | 중복 최소화 | 중복 발생 |
| 데이터 공유성 | 공유 가능 | 공유 불가 |
| 데이터 일관성 | 일관성 보장 | 일관성 불가 |
| 생산성 | 고 | 저 |`
  },
  {
    id: 10, slug: '10', title: 'Database', tag: 'Database', created_at: '2025-10-16',
    content: `## 데이터베이스(Database)란?

물리적으로 HDD를 의미하며, **데이터를 담는 그릇**으로서 "데이터의 집합, 데이터 저장 공간"을 말합니다.

여러 명의 사용자나 응용 프로그램이 공유하거나 동시에 접근 가능한 데이터 집합입니다.

## 주요 특징: 통저운공

- **통합된 데이터**: 최소 중복으로 유지
- **저장된 데이터**: 컴퓨터 접근 가능
- **운영 데이터**: 기능 수행을 위함
- **공용 데이터**: 공동 이용

## 세부 특징

- **실시간 접근성**: 비정형적 질의에 실시간 처리 응답
- **계속적 변화**: 동적 상태 유지
- **동시공용**: 여러 사용자의 동시 접근
- **내용에 의한 참조**: 물리적 주소 대신 데이터 값으로 참조

## 데이터베이스의 발전

- **오프라인 관리**: 종이에 연필로 기록하는 장부 관리
- **파일시스템 사용**: 컴퓨터 파일 저장 (메모장, 엑셀). 데이터량 증가 시 중복으로 인한 불일치 위험
- **DBMS 등장**: 중복 최소화, 무결성 보장, 동시 접근 지원`
  },
  {
    id: 9, slug: '9', title: '정보의 진화 단계, DIKW', tag: 'Database', created_at: '2025-10-16',
    content: `## DIKW란?

Data-Information-Knowledge-Wisdom의 앞글자를 따온 약자로, **정보의 진화 단계**를 나타냅니다.

## 5단계 진화 과정

### 1단계 - 사실 (Fact)
독립적으로 존재하는 객관적 현실입니다.

### 2단계 - 데이터 (Data)
"서류"로 비유되는 날 것 그 자체입니다. 가공하기 전 순수한 상태의 사실이나 수치들. **Raw 데이터**입니다.

### 3단계 - 정보 (Information)
유의미하게 가공된 2차 데이터 형태입니다. 특정 목적을 달성하는 데 필요하도록 처리된 것. 데이터에 의미를 더한 형태입니다.

### 4단계 - 지식 (Knowledge)
정보 이용에 대한 노하우를 담은 것으로, 동종의 정보가 모여 일반화된 형태로 정리됩니다.

핵심 키워드: **부가가치, 일반화, 의사결정**

### 5단계 - 지혜 (Wisdom)
지식을 얻고 이해하고 응용하고 발전해나가는 정신적 능력입니다. 내재화된 능력으로 창의적 아이디어로 구현됩니다.`
  },
  {
    id: 8, slug: '8', title: '최신 DBMS / DB 기술 트렌드', tag: 'Database', created_at: '2025-10-16',
    content: `## DBMS란?

DBMS(Database Management System)는 데이터베이스를 관리하고 운영하는 소프트웨어입니다. "은행 관리 시스템 혹은 비서"로 비유할 수 있습니다.

DBMS 모델은 **관계형, 문서형, 그래프형** 세 가지로 나뉩니다.

## 최신 DBMS 기술 트렌드

- **클라우드 데이터베이스**: 접근성, 확장성, 가성비 장점
- **NOSQL + 데이터**: 대규모 데이터 처리에 강함
- **AI/ML 통합 & 자동화**
- **클라우드 네이티브 & 서버리스 DB**
- **에지 컴퓨팅(Edge DB) & 분산DB**
- **멀티모델 데이터베이스**: 여러 데이터 모델을 동시에 관리
- **Chimera**: 그래프 DB 구조 활용. "압도적으로 빠른 성능"으로 주목

## 주목할 DBMS 5가지

- **Oracle**: 전세계 1위 데이터베이스
- **PostgreSQL**: 벡터 데이터 기능과 증분 백업 기능이 추가된 오픈소스 DB
- **DuckDB**: 복잡 분석 쿼리에 강하며 온라인 분석 처리(OLAP)에 최적화
- **Microsoft SQL Server 2025**
- **Gauss DB**: 분산형으로 대규모 산업 서비스에 주로 사용`
  },
  {
    id: 7, slug: '7', title: '해킹, 그것은 어디까지 발을 뻗을 수 있는가.', tag: '독서', created_at: '2025-09-21',
    content: `> "해킹에는 나쁜 부분도 많지만 그만큼 좋은 부분들도 참 많다."

## 해커의 세 가지 유형

- **화이트 해커 (White Hat)**: 윤리적 의도의 해커. 보안을 위해 일합니다.
- **블랙 해커 (Black Hat)**: 악의적 목표를 가진 해커. 보이스 피싱, 기업 정보 유출, 금전적 문제를 일으킵니다.
- **그레이 해커 (Gray Hat)**: 사전 동의 없이 침입하지만 반드시 악의적이지 않습니다.

## 해킹과 심리전

블랙 해커들은 기술만이 아닌 **인간의 심리**를 활용합니다. 이것이 보안이 단순한 기술 문제를 넘어서는 이유입니다.

## 실제 사례 분석

### SK텔레콤 유심 정보 유출 (2025년)
- 약 2,500만 명의 사용자에게 영향
- 근본 원인: 관리자 계정의 평문 저장과 백도어 방치
- 보안 업데이트 지연이 해커들에게 공격 기회를 제공

> "정시 업데이트가 그러한 사건을 방지합니다."

### Colonial Pipeline 랜섬웨어 (2021년, 미국)
암호 화폐로 440만 달러를 지불한 사건. 협상이 진정한 보안을 제공하는지 의문을 제기합니다.

## 주요 논거

반응적 위기 관리보다는 **주도적인 보안 인식**과 정기적인 시스템 유지보수가 중요합니다.`
  },
  {
    id: 6, slug: '6', title: '해킹으로 본 사이버 범죄 #4.', tag: '독서', created_at: '2025-09-21',
    content: `책의 7-8장을 읽고 미래의 해킹 대응과 윤리적 측면에 대해 정리합니다.

## 가장 인상 깊었던 문장

> "너의 적을 알고 너 자신을 알아라"

사이버 범죄자의 심리와 동기를 파악함으로써 그들의 행동을 예측하고 더 효과적으로 대응할 수 있습니다. 이순신 장군의 전략에 비유되며, 사이버 보안 전문가도 블랙 해커의 동기와 특성을 먼저 이해하는 것이 중요합니다.

## Script Kiddie

> "다른 사람이 만든 스크립트나 프로그램을 사용해 해킹을 시도하는 초보 해커"

이 단계에서 경험을 쌓고 기술을 익히면 숙련된 해커로 성장할 수 있습니다.

## 마치며

화이트 해커를 꿈꾸면서 경험을 쌓는 방법을 몰랐던 상황에서 이 책이 큰 도움이 되었습니다.

해킹에 관심 있는 분들에게 — 내용 자체는 다소 딱딱하지만 매우 실용적인 도서로 추천합니다.`
  },
  {
    id: 5, slug: '5', title: '해킹으로 본 사이버 범죄 #3.', tag: '독서', created_at: '2025-09-21',
    content: `"해킹으로 본 사이버 범죄" 5, 6장 독서 기록입니다.

## 핵심 내용 세 가지

### 1. 보안 업데이트의 중요성

> "보안이라는 것은 시간이 많이 걸려서, 혹은 파일이 잘못 지워질까 봐라는 사유로 미뤄지기도 하는 법"

보안 업데이트 지연은 해커에게 공격 기회를 제공하며 더 큰 피해를 초래할 수 있습니다.

### 2. 사이버 보험의 필요성

디지털 시대에 사이버 보험이 점점 중요해지고 있습니다. 보장 범위:
- 데이터 유출 대응 비용
- 랜섬웨어 대응 비용
- 사업 중단 손실
- 법적 책임/규제 벌금

### 3. 미래의 생체 기술

AI와 빅데이터를 활용하여 생물학적 특징뿐 아니라 행동 패턴, 습관, 감정까지 분석하는 시대가 올 것으로 예상됩니다.

## 소감

똑똑한 기술이 해킹에 악용되는 현실이 우려됩니다. 방어하는 측과 공격하는 측 모두 끊임없이 진화하고 있습니다.`
  },
  {
    id: 4, slug: '4', title: '해킹으로 본 사이버 범죄 #2.', tag: '독서', created_at: '2025-09-21',
    content: `"해킹으로 본 사이버 범죄" 3, 4장 독서 기록입니다. 사이버 범죄의 대상과 영향, 해킹의 법적 위치에 대해 학습했습니다.

## 스피어 피싱 (Spear Phishing)

가장 친숙한 해킹 기법으로, **특정 기업이나 개인을 겨냥한 맞춤형 공격**입니다.

목표 대상의 상세 정보를 이용하여 설득력 있는 이메일로 악성 첨부파일 또는 피싱 사이트 접속을 유도합니다.

## 선거 해킹

가장 충격적이었던 내용입니다. 투표 시스템 공격을 넘어, **소셜 미디어와 온라인 플랫폼을 통해 정보와 여론을 조작**하여 유권자의 인식을 왜곡합니다.

이전에 선거 조작 뉴스를 가볍게 넘겼던 자신을 반성하게 되었습니다.

## 화이트 해커의 법적 지위

두 가지 주요 쟁점:
- 허가받지 않은 시스템 접근의 법적 해석
- 발견된 취약점 처리 방식

내 꿈의 직업이 화이트 해커인 만큼, 윤리적 의도가 항상 법적으로 보장될 수 있는지 의문이 생깁니다.

감시 체계의 실효성과 정보 보안 사이의 딜레마를 더 깊이 생각해봐야 할 것 같습니다.`
  },
  {
    id: 3, slug: '3', title: '해킹으로 본 사이버 범죄 #1.', tag: '독서', created_at: '2025-09-21',
    content: `"해킹으로 본 사이버 범죄" ch01, 02 독서 기록입니다.

## 해커의 본래 의미

해커의 의미가 원래는 **"창의적이고 혁신적인 방식으로 문제를 해결하는 사람"**이었다는 것을 처음 알게 되었습니다.

## 해커의 종류

- **화이트 해커**: 윤리적 해커, 아군
- **블랙 해커**: 악의적 의도를 가진 해커, 적
- **그레이 해커**: 화이트와 블랙 사이의 중간 존재. 사전 동의 없이 침입하지만 반드시 악의적이지 않음

## 주요 해킹 기법

### 피싱 (Phishing)

> "가장 교묘하고 효과적인 공격 기법 중 하나"

인간의 심리적 특성을 교묘히 이용합니다. 주로 사용자의 민감한 정보를 탈취하는 데 사용합니다.

### DDoS (분산 서비스 거부 공격)

> 해킹 기법 중 가장 강력하고 파괴적인 방법 중 하나

블랙 해커가 '봇넷'이라는 감염된 컴퓨터 네트워크를 사용하여 수천, 수백만 대의 컴퓨터로 위장해 피해자를 공격합니다.

## 인상 깊었던 문구

> "해킹은 어디까지 범죄로 볼 것인가?"
> "정보의 자유로운 흐름과 보안 사이의 균형은 어떻게 맞춰야 하는가?"

아직 명쾌한 답을 내리기 어렵습니다. 책을 더 정독한 후에야 답할 수 있을 것 같습니다.`
  },
  {
    id: 2, slug: '2', title: 'A하라 죽이기 #2.', tag: '독서', created_at: '2025-09-19',
    content: `"A하라 죽이기" 중후반부 독서 감상문입니다.

## 분노와 현실 비판

중후반부를 읽으며 강한 분노를 느꼈습니다. 창업주의 아들이라는 신분으로 인해 실수를 외면하고 다른 사람에게 책임을 뒤집어씌우는 회사의 태도를 보며 현대 조직의 민낯을 마주했습니다.

## 디지털 마녀사냥

현대 사회가 가십거리를 좋아하는 이유를 고찰하며, 이 책이 디지털 마녀사냥을 정확하게 비판한다는 것을 느꼈습니다. 현실에서 피해를 입는 사람들의 고통을 생각하면 마음이 무거워집니다.

## 인상 깊은 두 가지 인용구

**디지털 타투 (p.285)**

> "인터넷에 새겨진 지워지지 않는 상흔을 문신에 비유한 표현"

온라인 평판은 실제 문신과 같은 영구적인 손상을 받습니다.

**말의 힘 (p.465)**

> "말이 사람을 살리기도 죽이기도 하는데, 사람들이 이를 너무 가볍게 생각한다."

더 이상 거짓에 현혹되거나 단순한 재미로 타인을 몰아가는 태도가 없어지기를 바랍니다.`
  },
  {
    id: 1, slug: '1', title: 'A하라 죽이기 #1.', tag: '독서', created_at: '2025-09-19',
    content: `"A하라 죽이기" 전반부 독서 감상문입니다.

특정 해시태그로 무엇이 진실인지도 모른 채 욕을 하는 사람들의 모습이 참으로 무섭고도 끔찍하다는 생각이 들었다.

내가 하는 말이 숨겨진 진실 아래 숨은 이에게 독이 될 수 있다는 걸 알면서도 이를 모른 척하는 사람들의 모습이 잘 드러나 있달까.

왜 세상은 한 가지 말만 믿고 그렇게 못될 수만 있어야 하는지 참 이해가 안 되는 현실이다. 분명 주인공 에이하라가 잘못한 게 아닌데 그저 누명을 쓴 것일 뿐일 터인데 왜 세상은 그래야만 하는 것일까.

현실 속 악플들도 참 무섭지만 책 속의 세상도 참 무서운 거 같다.

중반부와 후반부에서는 제발 에이하라의 억울함이 풀릴 수 있길 바라본다.

Tags: Aylen, A하라죽이기, 전반부, 첫글`
  }
]

// posts.json (목록, 최신순)
const postsMeta = posts
  .sort((a, b) => b.id - a.id)
  .map(({ id, slug, title, tag, created_at, content }) => ({
    id, slug, title, tag,
    excerpt: content.replace(/!\[.*?\]\(.*?\)/g, '').replace(/[#>\-*`\[\]]/g, '').split('\n').find(l => l.trim().length > 20)?.trim().slice(0, 80) + '...' || '',
    created_at,
  }))

writeFileSync(join(__dirname, '../public/data/posts.json'), JSON.stringify(postsMeta, null, 2), 'utf8')

for (const post of posts) {
  const { id, slug, title, tag, created_at, content } = post
  const excerpt = content.replace(/!\[.*?\]\(.*?\)/g, '').replace(/[#>\-*`\[\]]/g, '').split('\n').find(l => l.trim().length > 20)?.trim().slice(0, 80) + '...' || ''
  writeFileSync(join(dataDir, `${slug}.json`), JSON.stringify({ id, slug, title, tag, excerpt, content, created_at }, null, 2), 'utf8')
}

console.log(`✓ posts.json + ${posts.length}개 글 파일 생성 완료`)
