"""
AI Automation Specialist Advisor
Demonstrates the Claude Project system prompt used via the Anthropic API.
Includes prompt caching for efficient repeated use of the long system prompt.
"""

import anthropic
from pathlib import Path

SYSTEM_PROMPT = Path(__file__).parent.parent / "prompt.md"


def ask_advisor(question: str) -> str:
    client = anthropic.Anthropic()

    system = SYSTEM_PROMPT.read_text()

    response = client.messages.create(
        model="claude-opus-4-5",
        max_tokens=1024,
        system=[
            {
                "type": "text",
                "text": system,
                "cache_control": {"type": "ephemeral"},  # cache the long system prompt
            }
        ],
        messages=[{"role": "user", "content": question}],
    )

    return response.content[0].text


if __name__ == "__main__":
    scenarios = [
        "A parks department coordinator manually emails PDF permit applications to three different reviewers, waits for replies, and tracks status in a spreadsheet. How would you automate this?",
        "We want to build a chatbot that answers questions from the public about their recycling pickup schedule using address lookup. What do we need to figure out before we build this?",
        'Review this agent prompt: "You are a helpful assistant. Answer any questions from Metro staff about HR policies based on the documents provided."',
    ]

    for i, scenario in enumerate(scenarios, 1):
        print(f"\n{'='*60}")
        print(f"Scenario {i}")
        print(f"{'='*60}")
        print(f"Q: {scenario}\n")
        print(f"A: {ask_advisor(scenario)}")
