import React from 'react';

function ResponsePanel({classifications}) {
    return (
        <div>

            <ul className="plaintext">
              <p>Your results: </p>
              {classifications.map((classif, index) =>
                <li key={index}>
                  {classif}
                </li>
              )}
            </ul>

            <div>
              <p>{classifications.includes("Catastrophizing") ? 
                <div>
                  <p>Steps to stop catastrophizing:</p>
                  <ul>
                    <li>Say "stop" out loud</li>
                    <li>Focus on what is rather than what if</li>
                    <li>Try not to latch onto thoughts, just let them pass through your mind</li>
                  </ul>
                </div>
              : ""}</p>
            </div>

            <div>
              <p>{classifications.includes("Anxiety") ? 
                <div>
                  <p>Ways to manage anxiety:</p>
                  <ul>
                    <li>Talk to someone you trust</li>
                    <li>Set aside time to focus on your worries so you're not worrying that you forgot something important</li>
                    <li>Journal/write down your worries</li>
                    <li>Do breathing exercises</li>
                  </ul>
                </div>
              : ""}</p>
            </div>

            <div>
              <p>{classifications.includes("Low self esteem") ? 
                <div>
                  <p>Ways to manage low self esteem:</p>
                  <ul>
                    <li>Take care of your physical health -- get enough sleep!</li>
                    <li>Say kind things to yourself</li>
                    <li>Ask people what they like about you</li>
                  </ul>
                </div>
              : ""}</p>
            </div>

        </div>
    );
}

export default ResponsePanel;