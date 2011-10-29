echo "Building version 0.1"
echo @off
rem Compiling version 0.1 of Infertek.Core
"..\Tools\MergeFiles\MergeFiles\bin\Release\MergeFiles.exe" "Source\Common\DomExtensions.js" "Source\Common\Namespaces.js" "Source\Common\ScriptManager.js" -o "Build\Infertek.Core-0.1-debug.js"
java -jar "YuiCompressor\yuicompressor-2.4.6.jar" "Build\Infertek.Core-0.1-debug.js" -o "Build\Infertek.Core-0.1.js"

rem Compiling version 0.1 of Infertek.Animations
"..\Tools\MergeFiles\MergeFiles\bin\Release\MergeFiles.exe" "Source\Common\Exceptions.js" "Source\Animations\PropertyValueAnimators.js"  "Source\Animations\FrameBlendingFunctions.js" "Source\Animations\AnimationKeyframe.js" "Source\Animations\AnimationProperty.js" "Source\Animations\Animation.js" -o "Build\Infertek.Animations-0.1-debug.js"
java -jar "YuiCompressor\yuicompressor-2.4.6.jar" "Build\Infertek.Animations-0.1-debug.js" -o "Build\Infertek.Animations-0.1.js"
echo @on
echo "Version 0.1 built"