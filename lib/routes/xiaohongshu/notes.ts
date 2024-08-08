import { Route } from '@/types';
import cache from '@/utils/cache';
import { getNotes, formatText, formatNote } from './util';

export const route: Route = {
    path: '/user/:user_id/notes/fulltext',
    radar: [
        {
            source: ['xiaohongshu.com/user/profile/:user_id'],
            target: '/user/:user_id/notes',
        },
    ],
    name: '笔记 • 小红书 / RED',
    maintainers: [],
    handler,
    example: '/xiaohongshu/user/52d8c541b4c4d60e6c867480/notes/fulltext',
    parameters: {
        user_id: 'user id, length 24 characters',
    },
};

async function handler(ctx) {
    const userId = ctx.req.param('user_id');
    const url = `https://www.xiaohongshu.com/user/profile/${userId}`;

    const { user, notes } = await getNotes(url, cache);

    return {
        title: `${user.nickname} - 笔记 • 小红书 / RED`,
        description: formatText(user.desc),
        image: user.imageb || user.images,
        link: url,
        item: notes.map((item) => formatNote(url, item)),
    };
}
