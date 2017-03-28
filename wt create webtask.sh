wt create webtask/tasks.js \
--meta wt-compiler=webtask-tools/express \
-s AUTH0_SECRET=_hAw2lwJSnYxA9ErKEVSoDVR7inH2BS-QPb7teAQ95raFPWL5ItdcuVDv_xycvkQ \
-s MONGO_USER=yattishr \
-s MONGO_PASSWORD=yat8676 \
-s MONGO_URL=ds143340.mlab.com:43340/task-list-app \
--prod

https://wt-2079fba944941ff452d73111a9c3b184-0.run.webtask.io/tasks
