---
title: "Test Image Rendering"
date: "2025-01-23"
author: "Test Author"
excerpt: "Testing image rendering in markdown blog posts"
readTime: "2 min read"
---

# Test Image Rendering

This is a test post to see if images render properly in our markdown blog system.

Here's the first image you wanted to test:

![Two different breeds of cats side by side outdoors in the garden](https://cdn.britannica.com/34/235834-050-C5843610/two-different-breeds-of-cats-side-by-side-outdoors-in-the-garden.jpg)

And here's the Wikipedia cat image:

![Cat from Wikipedia](https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/640px-Cat_August_2010-4.jpg)

Both images should appear above this text if the markdown rendering is working correctly.

## Code Block Test

Here's a Python code block to test syntax highlighting:

```python
def train_rl_agent(environment, policy_network):
    """Train an RL agent using PPO algorithm"""
    optimizer = torch.optim.Adam(policy_network.parameters(), lr=0.001)
    
    for episode in range(1000):
        state = environment.reset()
        total_reward = 0
        
        while not done:
            action = policy_network.forward(state)
            next_state, reward, done = environment.step(action)
            total_reward += reward
            state = next_state
            
        print(f"Episode {episode}: Total Reward = {total_reward}")
    
    return policy_network
```

And here's some inline code: `pip install torch gymnasium`

## Additional Test Content

This is just some additional content to make sure the blog post renders properly with both text and images.