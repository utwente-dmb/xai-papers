FROM python:3.10-slim

WORKDIR /app
COPY requirements.txt .
RUN pip3 install -r requirements.txt

CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0"]