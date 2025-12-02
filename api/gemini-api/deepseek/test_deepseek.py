# '''
# Author: Jacob 1126137157@qq.com
# Date: 2025-12-01 16:59:36
# LastEditors: Jacob 1126137157@qq.com
# LastEditTime: 2025-12-01 19:00:13
# FilePath: \blog\api\gemini-api\test_gemini.py
# Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
# '''
# import google.generativeai as genai
# import os
# # import os
# # 这里的端口号 7890 取决于你的代理软件设置，通常是 7890, 1080, 10809 等
# os.environ["HTTP_PROXY"] = "http://127.0.0.1:7897"
# os.environ["HTTPS_PROXY"] = "http://127.0.0.1:7897"

# # 1. 配置 API Key
# # 建议将 Key 放在环境变量中，或者直接在这里替换
# # 如果你只是简单测试，直接把 "YOUR_API_KEY" 换成你的字符串即可
# api_key = "s********b0"
# genai.configure(api_key=api_key)

# # 2. 列出可用模型（可选，用于查看你可以用哪些模型）
# # for m in genai.list_models():
# #     if 'generateContent' in m.supported_generation_methods:
# #         print(m.name)

# # 3. 初始化模型
# # 目前推荐使用 'gemini-1.5-flash' (速度快，免费额度多) 或 'gemini-1.5-pro' (能力更强)
# # free gemini-2.5-pro
# # charge  gemini-3-pro-preview
# model = genai.GenerativeModel('gemini-2.5-pro')

# # 4. 发送请求
# prompt = "请用一句话通过量子力学的原理解释为什么在这个宇宙中我找不到女朋友。"
# print(f"正在询问 Gemini: {prompt} ...\n")

# try:
#     response = model.generate_content(prompt)
    
#     # 5. 打印结果
#     print("Gemini 回答:")
#     print(response.text)

# except Exception as e:
#     print(f"调用出错: {e}")



# Please install OpenAI SDK first: `pip3 install openai`
import os
from openai import OpenAI

OPENAI_API_KEY = "sk-21d4099094e04d72bf2f4cd0582c3ab0"
client = OpenAI(
    api_key=OPENAI_API_KEY,
    base_url="https://api.deepseek.com/v1")

response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[
        {"role": "system", "content": "You are a helpful assistant"},
        {"role": "user", "content": "Hello"},
    ],
    stream=False
)

print(response.choices[0].message.content)
