// src/pages/Apply.tsx
import Header from "../components/Header";
import Typewriter from "../components/Typewriter"; // 아래 컴포넌트 사용
import "../style/Apply.css";

export default function Apply() {
  return (
    <>
      <Header />
      <main className="apply">
        <section className="apply__hero">
          <h1 className="apply__title">
            <Typewriter
              texts={["여기는 아직 공사중"]}
              typeDelay={110} // 글자당 속도(ms)
              switchDelay={4000} // 완성 후 다시 타이핑 재시작까지 대기(ms)
              className="apply__type"
              markerClass="marker" // 아래 CSS에 정의
              cursorClass="caret" // 아래 CSS에 정의
              cursorChar="|" // 커서 문자
            />
          </h1>
          <p className="apply__sub">
            페이지를 만드는 중이에요. 곧 멋지게 열어둘게요.
          </p>
        </section>
      </main>
    </>
  );
}
