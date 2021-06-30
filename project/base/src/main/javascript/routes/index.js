import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Welcome to your nunjucks project!',
        links: {
            nunjucksDocs: 'https://mozilla.github.io/nunjucks/templating.html',
            repository: 'https://github.com/keltroth/create-nunjucks-app/'
        }
    });
});

export default router;
