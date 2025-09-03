const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8 text-black">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center text-blue-600">
        About Haider's Blog
      </h1>

      {/* Intro */}
      <p className="text-lg text-black dark:text-black-300 text-center">
        Welcome to <span className="font-semibold">Haider's Blog</span> — a
        place where ideas, knowledge, and creativity come together.
        <br />
        Our mission is to provide engaging, insightful, and inspiring content
        for readers from all walks of life.
      </p>

      {/* Sections */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-black-800 dark:text-black-100">
          ✨ What We Do
        </h2>
        <p className="text-black-600 dark:text-black-300">
          We publish blogs on a wide variety of topics including{" "}
          <span className="font-medium">
            technology, lifestyle, motivation, and creativity
          </span>
          . Our platform allows users to{" "}
          <span className="font-medium">write, share, and connect</span> with
          others who are passionate about writing.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-black-800 dark:text-black-100">
          🚀 Our Vision
        </h2>
        <p className="text-black-600 dark:text-black-300">
          To build a vibrant community of writers and readers where ideas flow
          freely, discussions are meaningful, and creativity thrives.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-black-800 dark:text-black-100">
          👤 About the Creator
        </h2>
        <p className="text-black-600 dark:text-black-300">
          This platform was created by{" "}
          <span className="font-semibold">Haider</span>, a developer passionate
          about building modern web applications and creating meaningful digital
          experiences.
        </p>
      </section>

      {/* CTA */}
      <div className="text-center">
        <p className="text-black-700 dark:text-black-300 mb-4">
          Want to share your thoughts? Start writing today!
        </p>
        <a
          href="/register"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Join Now
        </a>
      </div>
    </div>
  );
};

export default About;
