import { AppConfig } from "@/config/app.config";

export default function Home() {
  return (
    <main className="container">
      <div>
        {/* title */}
        <h1 className="text-4xl font-medium text-center mb-10">
          Welcome to {AppConfig().app.name}
        </h1>

        {/* card */}
        <div className="flex">
          <div className="m-5 max-w-sm rounded overflow-hidden shadow-lg">
            <img
              className="w-full"
              src="https://static.lightoj.com/assets/problem-solving.svg"
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Solve Problems</div>
              <p className="text-gray-700 text-base">
                Solve various algorithmic problems on {AppConfig().app.name}.
                All the problems are categorized. Kick start problem solving
                from the warm-up problems.
              </p>
            </div>
          </div>
          <div className="m-5 max-w-sm rounded overflow-hidden shadow-lg">
            <img
              className="w-full"
              src="https://static.lightoj.com/assets/trophy.svg"
              alt="Sunset in the mountains"
            />
            <div className="m-5 px-6 py-4">
              <div className="font-bold text-xl mb-2">
                Host Contests and Participate
              </div>
              <p className="text-gray-700 text-base">
                Participate in contests arranged by {AppConfig().app.name} and the community.
                And host contests without any fee(*) on {AppConfig().app.name}.
              </p>
            </div>
          </div>
          <div className="m-5 max-w-sm rounded overflow-hidden shadow-lg">
            <img
              className="w-full"
              src="https://static.lightoj.com/assets/coding.svg"
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                Become Better Programmer
              </div>
              <p className="text-gray-700 text-base">
                We will be introducing various new features which will help you
                to become a better programmer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
