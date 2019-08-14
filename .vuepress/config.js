module.exports = {
    title: 'VuePress 시작!',
    description: 'Hello World',
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'docs', link: '/docs/' },
            { text: 'sub1', link: '/sub1/' },
            { text: 'sub2', link: '/sub2/' },
            { text: 'file1', link: '/sub2/file1' },
            { 
                text: 'JS',
                items: [
                    { text: 'javascript', link: '/javascript/' },
                    { text: 'jquery', link: '/jquery/' },
                ] 
                
            }
        ],
        sidebar: 'auto'
    },
    plugins: [
        '@vuepress/back-to-top',
        ['@vuepress/pwa', {
            serviceWorker: true,
            updatePopup: true
        }]
    ],
    markdown: {
        lineNumbers: true
    }
}