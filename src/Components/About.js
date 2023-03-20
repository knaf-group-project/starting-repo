import React from 'react';

const About = () => {
    return (
        <div className='aboutPage'>
            <h2 className='aboutTitle'>What is an Escape Room?</h2>
                <p className='aboutP'>Escape rooms are real life adventures wehre you and your fellow teammates have an hour to "break out" of a room by finding clues to crack codes, solve riddles, and piece together puzzles. The game origincated in Jpan and is based off escape the room video games created by Toshimitsu Takagi in 2005.</p>
            <h2 className='aboutTitle'>How to Play?</h2>
                <p className='aboutP'>There is no perfect or one way to play an escape room. Just need to remember these three things...</p>
                    <ol className='aboutList'>
                        <li>1. <span className='aboutListTitle'>Explore the room for clues.</span> The first thing to do is to look around and see if you can find any clues or puzzles that need to be solved. The clues will eventually lead you to the final goal.</li>
                        <li>2. <span className='aboutListTitle'>Use your resources.</span> Use anything around you, either it be a white board to keep track of codes or a proctor for clues and hints. Searching for answers on your phone on the other hand is prohibited.</li>
                        <li>3. <span className='aboutListTitle'>Work together as a Team.</span> Team work is very important if you want to escape the room.</li>
                        <li>4. <span className='aboutListTitle'>Lastly, Communicate with your teammates.</span></li>
                    </ol>
            <h2 className='aboutTitle'>So what do you need to do?</h2>
                <ol className='aboutList'>
                    <li>1. Recruit your Friends to be locked up with</li>
                    <li>2. Select a room you want to experience. Here we have 6 different rooms to choose from</li>
                    <li>3. Find clues, solve puzzles, and have fun</li>
                </ol>
                <p className='aboutPLast'>...AND THAT IS IT</p>
        </div>
    )
}

export default About