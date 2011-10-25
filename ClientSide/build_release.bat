echo "Building version 0.1"
echo @off
rem Compiling version 0.1 of Infertek.Core
"..\Tools\MergeFiles\MergeFiles\bin\Release\MergeFiles.exe" "Scripts\Common\DomExtensions.js" "Scripts\Common\Namespaces.js" "Scripts\Common\ScriptManager.js" -o "Scripts\Infertek.Core-0.1-debug.js"
java -jar "YuiCompressor\yuicompressor-2.4.6.jar" "Scripts\Infertek.Core-0.1-debug.js" -o "Scripts\Infertek.Core-0.1.js"

rem Compiling version 0.1 of Infertek.Animations
"..\Tools\MergeFiles\MergeFiles\bin\Release\MergeFiles.exe" "Scripts\Common\Exceptions.js" "Scripts\Animations\PropertyValueAnimators.js"  "Scripts\Animations\FrameBlendingFunctions.js" "Scripts\Animations\AnimationKeyframe.js" "Scripts\Animations\AnimationProperty.js" "Scripts\Animations\Animation.js" -o "Scripts\Infertek.Animations-0.1-debug.js"
java -jar "YuiCompressor\yuicompressor-2.4.6.jar" "Scripts\Infertek.Animations-0.1-debug.js" -o "Scripts\Infertek.Animations-0.1.js"
echo @on
echo "Version 0.1 built"