#!/usr/bin/env python3
"""
Gemini Design Enhancement Helper
A simple script to use Google's Gemini AI for design enhancement prompts.
"""

import google.generativeai as genai
import os
from typing import Optional

class GeminiDesignHelper:
    def __init__(self, api_key: Optional[str] = None):
        """
        Initialize the Gemini Design Helper.
        
        Args:
            api_key: Your Google AI API key. If not provided, will look for GEMINI_API_KEY environment variable.
        """
        if api_key:
            self.api_key = api_key
        else:
            self.api_key = os.getenv('GEMINI_API_KEY')
            
        if not self.api_key:
            raise ValueError("API key required. Set GEMINI_API_KEY environment variable or pass api_key parameter.")
            
        genai.configure(api_key=self.api_key)
        self.model = genai.GenerativeModel('gemini-pro')
    
    def enhance_design_prompt(self, design_description: str, style: str = "modern", context: str = "") -> str:
        """
        Generate an enhanced design prompt using Gemini.
        
        Args:
            design_description: Your initial design idea or description
            style: Design style (modern, minimalist, vintage, etc.)
            context: Additional context about the project
            
        Returns:
            Enhanced design prompt
        """
        prompt = f"""
        You are a professional design consultant. Enhance this design idea with detailed, actionable suggestions:
        
        Original idea: {design_description}
        Style preference: {style}
        Context: {context}
        
        Please provide:
        1. A refined design concept with specific details
        2. Color palette suggestions
        3. Typography recommendations
        4. Layout and composition tips
        5. User experience considerations
        6. Technical implementation notes
        
        Make the response practical and actionable for a designer.
        """
        
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            return f"Error generating design enhancement: {str(e)}"
    
    def generate_design_variations(self, base_concept: str, num_variations: int = 3) -> str:
        """
        Generate multiple design variations of a concept.
        
        Args:
            base_concept: The base design concept
            num_variations: Number of variations to generate
            
        Returns:
            Design variations with explanations
        """
        prompt = f"""
        Generate {num_variations} distinct design variations for this concept: {base_concept}
        
        For each variation, provide:
        1. A unique name/title
        2. Key visual characteristics
        3. Target audience
        4. Use case scenarios
        5. Implementation considerations
        
        Make each variation distinctly different while maintaining the core concept.
        """
        
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            return f"Error generating design variations: {str(e)}"
    
    def critique_design(self, design_description: str) -> str:
        """
        Provide constructive design critique and improvement suggestions.
        
        Args:
            design_description: Description of the design to critique
            
        Returns:
            Detailed critique with improvement suggestions
        """
        prompt = f"""
        As a senior design director, provide a constructive critique of this design:
        
        {design_description}
        
        Please analyze:
        1. Strengths and what works well
        2. Areas for improvement
        3. Accessibility considerations
        4. User experience issues
        5. Visual hierarchy and composition
        6. Specific actionable recommendations
        
        Be constructive and provide specific, implementable suggestions.
        """
        
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            return f"Error generating design critique: {str(e)}"

def main():
    """Example usage of the Gemini Design Helper."""
    print("🎨 Gemini Design Enhancement Helper")
    print("=" * 50)
    
    # Check if API key is set
    api_key = os.getenv('GEMINI_API_KEY')
    if not api_key:
        print("❌ Please set your GEMINI_API_KEY environment variable first.")
        print("   Get your API key from: https://makersuite.google.com/app/apikey")
        print("   Then run: export GEMINI_API_KEY='your-api-key-here'")
        return
    
    try:
        helper = GeminiDesignHelper()
        
        # Example usage
        print("\n📝 Example: Enhancing a design concept...")
        enhanced = helper.enhance_design_prompt(
            "A mobile app for tracking daily habits",
            style="minimalist",
            context="Target audience: young professionals, focus on simplicity"
        )
        print(enhanced)
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    main()
