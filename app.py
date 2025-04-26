from flask import Flask, render_template, request, redirect, url_for, jsonify
import json
from datetime import datetime

app = Flask(__name__)

with open("data.json") as f:
    data = json.load(f)

# Log user activity
def log_activity(action, payload=None):
    with open("log.txt", "a") as log:
        entry = {
            "timestamp": datetime.now().isoformat(),
            "action": action,
            "data": payload
        }
        log.write(json.dumps(entry) + "\n")

@app.route("/")
def home():
    log_activity("visit_home")
    return render_template("home.html")

@app.route("/learn/<int:lesson_id>")
def learn(lesson_id):
    if lesson_id < 1 or lesson_id > len(data["lessons"]):
        return redirect(url_for("home"))
    lesson = data["lessons"][lesson_id - 1]
    log_activity("visit_lesson", {"lesson_id": lesson_id})
    return render_template("lesson.html", lesson=lesson, lesson_id=lesson_id, total=len(data["lessons"]))

@app.route("/quiz/<int:quiz_id>")
def quiz(quiz_id):
    if quiz_id < 1 or quiz_id > len(data["final_quiz"]):
        return redirect(url_for("home"))
    question = data["final_quiz"][quiz_id - 1]
    log_activity("visit_quiz", {"quiz_id": quiz_id})
    return render_template("quiz.html", question=question, quiz_id=quiz_id, total=len(data["final_quiz"]))

@app.route("/submit_quiz", methods=["POST"])
def submit_quiz():
    answers = request.json.get("answers", [])
    score = 0
    
    # Make sure we only process answers up to the number of questions we have
    num_questions = len(data["final_quiz"])
    valid_answers = answers[:num_questions]
    
    for i, answer in enumerate(valid_answers):
        if answer == data["final_quiz"][i]["correct"]:
            score += 1
            
    return jsonify({"score": score})

@app.route("/result")
def result():
    log_activity("visit_result")
    return render_template("result.html")

@app.route("/get_quiz_data")
def get_quiz_data():
    return jsonify(data["final_quiz"])

if __name__ == "__main__":
    app.run(debug=True)
