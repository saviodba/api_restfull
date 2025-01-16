import express from 'express';

const app = express();
app.use(express.json());

interface Movie {
    id: number;
    title: string;
    studios: string;
    year: number;
    producers: string;
    winner: string;
}

const movies: Movie[] = [
    { id: 1, title: "Cruising", studios: "Lorimar Productions, United Artists", year: 1980, producers: "Jerry Weintraub", winner: "yes" },
    { id: 2, title: "The Karate Kid Part III", studios: "Columbia Pictures", year: 1989, producers: "Jerry Weintraub", winner: "yes" },
    { id: 3, title: "Cobra", studios: "Warner Bros., Cannon Films", year: 1986, producers: "Yoram Globus and Menahem Golan", winner: "yes" },
    { id: 4, title: "Hercules", studios: "MGM, United Artists, Cannon Films", year: 1983, producers: "Yoram Globus and Menahem Golan", winner: "yes" },
    { id: 5, title: "The Avengers", studios: "Warner Bros.", year: 1998, producers: "Jerry Weintraub", winner: "yes" },
    { id: 6, title: "The Specialist", studios: "Warner Bros.", year: 1994, producers: "Jerry Weintraub", winner: "yes" },
    { id: 7, title: "Tough Guys Don't Dance", studios: "Cannon Films", year: 1987, producers: "Yoram Globus and Menahem Golan", winner: "yes" }
];

function getAwardIntervals(movies: Movie[]) {
    const producerWins: { [key: string]: number[] } = {};

    movies.filter(movie => movie.winner === "yes")
        .forEach(movie => {
            movie.producers.split(/,| and /).forEach(producer => {
                producer = producer.trim();
                if (!producerWins[producer]) {
                    producerWins[producer] = [];
                }
                producerWins[producer].push(movie.year);
            });
        });

    const intervals = [];

    for (const producer in producerWins) {
        const years = producerWins[producer].sort((a, b) => a - b);
        for (let i = 1; i < years.length; i++) {
            intervals.push({
                producer,
                interval: years[i] - years[i - 1],
                previousWin: years[i - 1],
                followingWin: years[i]
            });
        }
    }

    const sortedIntervals = intervals.sort((a, b) => a.interval - b.interval);
    return {
        min: sortedIntervals.filter(interval => interval.interval === sortedIntervals[0]?.interval),
        max: sortedIntervals.filter(interval => interval.interval === sortedIntervals[sortedIntervals.length - 1]?.interval)
    };
}

app.get('/awards/intervals', (req, res) => {
    const result = getAwardIntervals(movies);
    res.json(result);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
