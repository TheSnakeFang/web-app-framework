const axios = require('axios');

async function searchOpenSourceNotionAlternatives() {
  try {
    const response = await axios.get('https://api.github.com/search/repositories', {
      params: {
        q: 'open source notion alternative oauth',
        sort: 'stars',
        order: 'desc'
      }
    });

    console.log('Top 5 open-source Notion alternatives with OAuth:');
    response.data.items.slice(0, 5).forEach((repo, index) => {
      console.log(`${index + 1}. ${repo.name} (${repo.html_url})`);
      console.log(`   Description: ${repo.description}`);
      console.log(`   Stars: ${repo.stargazers_count}`);
      console.log('---');
    });
  } catch (error) {
    console.error('Error searching for repositories:', error.message);
  }
}

searchOpenSourceNotionAlternatives();
