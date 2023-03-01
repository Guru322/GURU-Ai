cmd_Release/canvas.node := ln -f "Release/obj.target/canvas.node" "Release/canvas.node" 2>/dev/null || (rm -rf "Release/canvas.node" && cp -af "Release/obj.target/canvas.node" "Release/canvas.node")
